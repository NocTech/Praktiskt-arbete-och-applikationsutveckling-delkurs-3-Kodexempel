import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import dotenv from "dotenv";

dotenv.config();

async function main() {
	const model = new ChatOpenAI({
		model: "gpt-4o-mini",
		apiKey: process.env.OPENAI_API_KEY,
	});

	const geminiModel = new ChatGoogleGenerativeAI({
		model: "gemini-2.5-flash-preview-04-17",
		apiKey: process.env.GEMINI_API_KEY,
	});

	const response = await model.batch([
		"Tell me about birches. Very briefly!",
		"Tell me about oaks. Very briefly!",
		"Tell me about maples. Very briefly!",
	]);
	console.log(response);
	/* const response2 = await model.invoke("Tell me about birches. Very briefly!");

	console.log("Gemini response: ", response.content);
	console.log("OpenAI response: ", response2.content); */
}

main();
