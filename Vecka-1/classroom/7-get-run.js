import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});

async function getRun() {
    // Get the current run
    const threadID = "thread_7OgwWzPoQjSeaOCemNyc8z5h";
    const runID = "run_JPAETo1CICc85BjanYy5I6AE";
    const currentRun = await openai.beta.threads.runs.retrieve(
    	threadID,
    	runID
    );
    console.log("Run status: " + currentRun.status);
}

getRun()