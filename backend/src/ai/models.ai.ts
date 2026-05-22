import config from "../config/config.js";
import { ChatMistralAI } from "@langchain/mistralai"
import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere"
import {ChatOpenAI} from '@langchain/openai'



export const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey:config.MISTRAL_API_KEY,
})

export const mistralJudgeModel = new ChatMistralAI({
    model:"mistral-large-latest",
    apiKey:config.MISTRAL_API_KEY,
})

export const googleModel = new ChatGoogle({
    model:"gemini-flash-latest",
    apiKey:config.GOOGLE_API_KEY,
})

export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey:config.COHERE_API_KEY,
})

export const openAImodel = new ChatOpenAI({
    model:'gpt-3.5-turbo-0125',
    apiKey: config.OPENAI_API_KEY
})

