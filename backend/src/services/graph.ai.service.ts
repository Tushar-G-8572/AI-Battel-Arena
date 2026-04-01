import { StateGraph, Annotation, START, END, MessagesAnnotation } from '@langchain/langgraph'

import { HumanMessage } from '@langchain/core/messages'
import { googleModel, mistralModel, cohereModel } from './models.service.js'

type judgement = {
    winner: 'solution_1' | 'solution_2';
    solution_1_score: number;
    solution_2_score: number;
    reasoning: string;
}

const AIBattleState = Annotation.Root({
    ...MessagesAnnotation.spec,

    solution_1: Annotation<String>({
        reducer: (_, next) => next,
        default: () => ""
    }),
    solution_2: Annotation<String>({
        reducer: (_, next) => next,
        default: () => ""
    }),
    judgement: Annotation<judgement>({
        reducer: (_, next) => next,
        default: () => ({
            winner: "solution_1",
            solution_1_score: 0,
            solution_2_score: 0,
            reasoning: ""
        })
    })
})


type AIBattleStateType = typeof AIBattleState.State;

const firstModel = async (state: AIBattleStateType) => {
    const message = await mistralModel.invoke(state.messages);
    return { solution_1: message.content }
}

const secondModel = async (stata: AIBattleStateType) => {
    const message = await cohereModel.invoke(stata.messages);
    return { solution_2: message.content }
}

const judgeModel = async (state: AIBattleStateType) => {
    const userPrompt = state.messages.filter((m) => m._getType() === 'human')
        .map((m) => m.content)
        .join('\n');

    const judgePrompt = `
    You are a strict and unbiased judge evaluating two AI responses.

Original User Prompt:
"${userPrompt}"

Solution 1:
"${state.solution_1}"

Solution 2:
"${state.solution_2}"

Evaluate both solutions based on these criteria:
- Accuracy: Is the answer factually correct?
- Clarity: Is it easy to understand?
- Completeness: Does it fully address the prompt?
- Conciseness: No unnecessary fluff?

You MUST respond in this exact JSON format only, no extra text:
{
    "winner": "solution_1" or "solution_2",
    "solution_1_score": <number between 0 and 100>,
    "solution_2_score": <number between 0 and 100>,
    "reasoning": "<clear explanation of why you picked the winner>"
}
    `;

    const message = await googleModel.invoke(judgePrompt);

    const raw = message.content as string;
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed:judgement = JSON.parse(cleaned)

    return {judgement:parsed};

}

 export const battleGraph = new StateGraph(AIBattleState)
.addNode('firstModel',firstModel)
.addNode('secondModel',secondModel)
.addNode('judgeModel',judgeModel)
.addEdge(START,'firstModel')
.addEdge(START,'secondModel')
.addEdge('firstModel','judgeModel')
.addEdge('secondModel','judgeModel')
.addEdge('judgeModel',END)
.compile();

const result = await battleGraph.invoke({
    messages:[new HumanMessage("Explain recursion in simple terms")]
})

console.log("=== BATTLE RESULT ===");
console.log("Solution 1:\n", result.solution_1);
console.log("Solution 2:\n", result.solution_2);
console.log("Winner:", result.judgement.winner);
console.log("Score 1:", result.judgement.solution_1_score);
console.log("Score 2:", result.judgement.solution_2_score);
console.log("Reasoning:", result.judgement.reasoning);