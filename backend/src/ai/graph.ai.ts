import {
  StateSchema,
  type GraphNode,
  START,
  END,
  type CompiledStateGraph,
  StateGraph,
} from "@langchain/langgraph";
import z from "zod";
import {
  mistralModel,
  cohereModel,
  googleModel,
  openAImodel,
  mistralJudgeModel,
} from "./models.ai.js";
import {
  createAgent,
  HumanMessage,
  providerStrategy,
  toolStrategy,
} from "langchain";

const state = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_reasoning: z.string().default(""),
    solution_2_reasoning: z.string().default(""),
  }),
});

const JudgeSchema = z.object({
  solution_1_score: z.number().min(0).max(10),
  solution_2_score: z.number().min(0).max(10),
  solution_1_reasoning: z.string(),
  solution_2_reasoning: z.string(),
});

const solutionNode: GraphNode<typeof state> = async (state) => {
  const [mistralResponse, cohoreResponse] = await Promise.all([
    mistralModel.invoke(`${state.problem}`),
    cohereModel.invoke(`${state.problem}`),
  ]);

  return {
    solution_1: mistralResponse.text,
    solution_2: cohoreResponse.text,
  };
};

const judgeNode: GraphNode<typeof state> = async (state) => {
  const { problem, solution_1, solution_2 } = state;

  const systemPrompt = `
    You are a strict and unbiased judge evaluating two AI responses.

    Evaluate both responses based on:
    1. Accuracy
    2. Clarity
    3. Completeness
    4. Conciseness

    Give each solution a score from 0 to 10.
    Provide brief reasoning for each score.
    `;

  const humanMessage = new HumanMessage(`
        problem: ${problem}
        solution_1: ${solution_1}
        solution_2: ${solution_2}
        Please evaluate the solutions and provide scores and reasoning.
    `);

  const judge1 = createAgent({
    model: googleModel,
    responseFormat: providerStrategy(JudgeSchema),
    systemPrompt,
  });
  const judge2 = createAgent({
    model: mistralJudgeModel,
    responseFormat: toolStrategy(JudgeSchema),
    systemPrompt,
  });

  const [result1, result2] = await Promise.allSettled([
    judge1.invoke({ messages: [humanMessage] }),
    judge2.invoke({ messages: [humanMessage] }),
  ]);

  if (result1.status === "rejected") {
    console.error("Judge 1 (Google) failed:", result1.reason);
  }
  if (result2.status === "rejected") {
    console.error("Judge 2 (Mistral) failed:", result2.reason);
  }

  let judgeResponse;
  if (result1.status === "fulfilled") {
    judgeResponse = result1.value;
  } else if (result2.status === "fulfilled") {
    judgeResponse = result2.value;
  } else {
    throw new Error(
      `Both judges failed. Judge1: ${result1.reason} | Judge2: ${result2.reason}`,
    );
  }

  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judgeResponse.structuredResponse;

  return {
    judge: {
      solution_1_score,
      solution_2_score,
      solution_1_reasoning,
      solution_2_reasoning,
    },
  };
};

const graph = new StateGraph(state)
  .addNode("solution", solutionNode)
  .addNode("judge_node", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge_node")
  .addEdge("judge_node", END)
  .compile();

export default async function (problem: string) {
  const result = await graph.invoke({ problem: problem });
  return result;
}
