import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});

// List thread messages
async function listMessages() {
	const threadID = "thread_TuKGY7hN0QFJe5o7w4q0OXQp";
	const threadMessages = await openai.beta.threads.messages.list(threadID);

	console.log(threadMessages.data);
	console.log(threadMessages.data[0].content[0].text.value);
}
listMessages();
