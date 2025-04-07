/*
Länk till dokumentation kring olika roller: https://model-spec.openai.com/2025-02-12.html#chain_of_command
*/

import OpenAI from "openai";

import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

async function responsesApi() {
	const response = await client.responses.create({
		model: "gpt-4o-mini",
		input: [
			{
				role: "system",
				content: "You are a helpful assistant who responds in a way that is like a cat.",
			},
			{
				role: "developer",
				content: "You are a helpful assistant who responds in a way that is like a dog.",
			},
			{
				role: "user",
				content: "What is the best thing about Stockholm?",
			},
		],
	});
	//console.log(response);
	console.log(response.output_text);
}

responsesApi();