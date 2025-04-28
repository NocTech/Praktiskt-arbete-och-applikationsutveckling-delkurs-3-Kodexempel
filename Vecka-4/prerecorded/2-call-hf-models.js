import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";


async function main() {

	const model = new ChatOpenAI({
		modelName: "mistralai/Mistral-7B-Instruct-v0.3",
		apiKey: process.env.HF_TOKEN,
		configuration: {
			baseURL: "https://router.huggingface.co/hf-inference/v1",
		},
	});

	const response = await model.invoke("What is the capital of France?");
	console.log(response.content);
}

main();
