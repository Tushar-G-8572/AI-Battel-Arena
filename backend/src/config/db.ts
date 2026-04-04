import config from './config.js';
import mongoose from 'mongoose';

export async function connectToDB(){
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to db");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}