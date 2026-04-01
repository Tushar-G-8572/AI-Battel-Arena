import { HumanMessage } from "@langchain/core/messages";
import {battleGraph} from './src/services/graph.ai.service.js'

async function test() {
    try {
        console.log("Starting battle...");
        
        const result = await battleGraph.invoke({
            messages: [new HumanMessage("Explain recursion in simple terms")],
        });

        console.log("=== BATTLE RESULT ===");
        console.log("Solution 1:\n", result.solution_1);
        console.log("Solution 2:\n", result.solution_2);
        console.log("Winner:", result.judgement.winner);
        console.log("Score 1:", result.judgement.solution_1_score);
        console.log("Score 2:", result.judgement.solution_2_score);
        console.log("Reasoning:", result.judgement.reasoning);

    } catch (error) {
        console.error("Battle failed:", error);
    }
}

test();