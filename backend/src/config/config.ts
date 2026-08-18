import {config as dotenvConfig} from 'dotenv';
dotenvConfig();

type CONFIG = {
   readonly GOOGLE_API_KEY:string,
   readonly MISTRAL_API_KEY:string,
   readonly COHERE_API_KEY:string,
   readonly OPENAI_API_KEY:string
   readonly MONGO_URI:string,
   readonly JWT_SECRET:string,
   readonly CLIENT_ID:string,
   readonly CLIENT_SECRET:string,
   readonly REFRESH_TOKEN:string,
   readonly EMAIL_USER:string,
   readonly CLIENT_URL:string,
   readonly CALLBACK_URL:string
}

const config: CONFIG = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
    MONGO_URI:process.env.MONGO_URI || "",
    JWT_SECRET:process.env.JWT_SECRET || "",
    CLIENT_ID:process.env.CLIENT_ID || "",
    CLIENT_SECRET: process.env.CLIENT_SECRET || "",
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || "",
    EMAIL_USER: process.env.EMAIL_USER || "",
    CLIENT_URL:  process.env.CLIENT_URL || "http://localhost:5173/",
    CALLBACK_URL: process.env.CALLBACK_URL || "http://localhost:4000/api/auth/google/callback"
}

export default config;