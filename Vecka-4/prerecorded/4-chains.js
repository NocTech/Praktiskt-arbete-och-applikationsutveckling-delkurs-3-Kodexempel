import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const systemTemplate = "Translate the following text into {language}:";

const promptTemplate = ChatPromptTemplate.fromMessages([
	("system", systemTemplate),
	("user", "{text}"),
]);

async function main() {
	const model = new ChatOpenAI({
		modelName: "gpt-4o-mini",
		apiKey: process.env.OPENAI_API_KEY,
	});

    const chain = promptTemplate.pipe(model);

    const response = await chain.invoke({
        language: "French",
		text: "I like sunny days!",
	});

	console.log("Response: ", response.content);
}

main();
