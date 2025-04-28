import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";

import { OpenAI } from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



async function main() {
	const responseFromOpenAI = await client.responses.create({
        model: "gpt-4o-mini",
        input: "What is the capital of France?",
    })

    console.log(responseFromOpenAI.output_text);

	const model = new ChatOpenAI({
		modelName: "gpt-4o-mini",
		apiKey: process.env.OPENAI_API_KEY,
	});

	const response = await model.invoke("What is the capital of France?");
	console.log(response.content);
}

main();
