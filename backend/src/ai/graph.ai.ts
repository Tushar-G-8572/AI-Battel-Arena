import { StateSchema, type GraphNode,START,END, type CompiledStateGraph, StateGraph } from '@langchain/langgraph'
import z from 'zod'
import { mistralModel, cohereModel, googleModel,openAImodel, mistralJudgeModel } from './models.ai.js'
import { createAgent, HumanMessage, providerStrategy,toolStrategy } from 'langchain'

const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default("")
    })
})


const solutionNode: GraphNode<typeof state> = async (state) => {
    const [mistralResponse, cohoreResponse] = await Promise.all([
        mistralModel.invoke(`${state.problem}`),
        cohereModel.invoke(`${state.problem}`),
    ])
    return {
        solution_1: mistralResponse.text,
        solution_2: cohoreResponse.text,
    }
}

// const judgeNode: GraphNode<typeof state> = async (state) => {
//     const { problem, solution_1, solution_2 } = state

//     const judge1 = createAgent({
//         model: googleModel,
//         responseFormat: providerStrategy(z.object({
//             solution_1_score: z.number().min(0).max(10),
//             solution_2_score: z.number().min(0).max(10),
//             solution_1_reasoning: z.string(),
//             solution_2_reasoning: z.string()
//         })),
//         systemPrompt: `
//         You are a strict and unbiased judge evaluating two AI responses.
        
//         Original User Prompt:
//         "${problem}"
        
//         Solution 1:
//         "${solution_1.slice(0,300)}"
        
//         Solution 2:
//         "${solution_2.slice(0,300)}"
        
        
//         Evaluate both solutions based on these criteria:
//             - Accuracy: Is the answer factually correct?
//             - Clarity: Is it easy to understand?
//             - Completeness: Does it fully address the prompt?
//             - Conciseness: No unnecessary fluff?

//         Please provide a score out of 10 for each solution
//         Along with your reasoning for the scores.
//         `,
//     })
//     const judge2 = createAgent({
//         model: mistralJudgeModel,
//         responseFormat: providerStrategy(z.object({
//             solution_1_score: z.number().min(0).max(10),
//             solution_2_score: z.number().min(0).max(10),
//             solution_1_reasoning: z.string(),
//             solution_2_reasoning: z.string()
//         })),
//         systemPrompt: `
//         You are a strict and unbiased judge evaluating two AI responses.
        
//         Original User Prompt:
//         "${problem}"
        
//         Solution 1:
//         "${solution_1.slice(0,300)}"
        
//         Solution 2:
//         "${solution_2.slice(0,300)}"
        
        
//         Evaluate both solutions based on these criteria:
//             - Accuracy: Is the answer factually correct?
//             - Clarity: Is it easy to understand?
//             - Completeness: Does it fully address the prompt?
//             - Conciseness: No unnecessary fluff?

//         Please provide a score out of 10 for each solution
//         Along with your reasoning for the scores.
//         `,
//     })

//     const [judge_1_response,judge_2_response] = await Promise.all([
//         judge1.invoke({
//         messages: [
//             new HumanMessage(`
//                 problem: ${problem},
//                 solution_1: ${solution_1},
//                 solution_2: ${solution_2}
//                 Please evaluate the solutions and provide scores and reasoning.
//                 `)
//         ]
//     }),
//     judge2.invoke({
//         messages: [
//             new HumanMessage(`
//                 problem: ${problem},
//                 solution_1: ${solution_1},
//                 solution_2: ${solution_2}
//                 Please evaluate the solutions and provide scores and reasoning.
//                 `)
//         ]
//     })
//     ])

//     // const judgeResponse = await judge.invoke({
//     //     messages: [
//     //         new HumanMessage(`
//     //             problem: ${problem},
//     //             solution_1: ${solution_1},
//     //             solution_2: ${solution_2}
//     //             Please evaluate the solutions and provide scores and reasoning.
//     //             `)
//     //     ]
//     // })

//     const judgeResponse = judge_1_response || judge_2_response


//     const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judgeResponse.structuredResponse;

//     return {
//         judge: {
//             solution_1_score,
//             solution_2_score,
//             solution_1_reasoning,
//             solution_2_reasoning
//         }
//     }

// }

const judgeNode: GraphNode<typeof state> = async (state) => {
    const { problem, solution_1, solution_2 } = state

    const systemPrompt = `
        You are a strict and unbiased judge evaluating two AI responses.
        
        Original User Prompt: "${problem}"
        Solution 1: "${solution_1.slice(0, 300)}"
        Solution 2: "${solution_2.slice(0, 300)}"
        
        Evaluate based on: Accuracy, Clarity, Completeness, Conciseness.
        Provide a score out of 10 for each solution with brief reasoning.
    `

    const responseFormat = providerStrategy(z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
        solution_1_reasoning: z.string(),
        solution_2_reasoning: z.string()
    }))

    const humanMessage = new HumanMessage(`
        problem: ${problem}
        solution_1: ${solution_1}
        solution_2: ${solution_2}
        Please evaluate the solutions and provide scores and reasoning.
    `)

    const judge1 = createAgent({ model: googleModel, responseFormat, systemPrompt })
    const judge2 = createAgent({ model: mistralJudgeModel, responseFormat, systemPrompt })

    // ✅ allSettled never throws — each result is either fulfilled or rejected
    const [result1, result2] = await Promise.allSettled([
        judge1.invoke({ messages: [humanMessage] }),
        judge2.invoke({ messages: [humanMessage] }),
    ])

    // ✅ Pick first successful response
    let judgeResponse
    if (result1.status === 'fulfilled') {
        judgeResponse = result1.value
    } else if (result2.status === 'fulfilled') {
        console.warn('Judge 1 failed, falling back to Judge 2:', result1.reason)
        judgeResponse = result2.value
    } else {
        // ✅ Both failed — throw a clear error
        console.error('Judge 1 error:', result1.reason)
        console.error('Judge 2 error:', result2.reason)
        throw new Error('Both judges failed to evaluate the solutions.')
    }

    const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } 
        = judgeResponse.structuredResponse

    return {
        judge: { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning }
    }
}

const graph = new StateGraph(state)
                    .addNode('solution',solutionNode)
                    .addNode('judge_node',judgeNode)
                    .addEdge(START,"solution")
                    .addEdge('solution','judge_node')
                    .addEdge('judge_node',END)
                    .compile()

export default async function(problem:string){
    const result = await graph.invoke({problem:problem})
    return result
}
