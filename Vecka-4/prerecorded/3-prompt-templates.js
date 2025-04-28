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

    const promptValue = await promptTemplate.invoke({
        language: "French",
        text: "I like sunny days!",
    })

    console.log("Prompt Value: ", promptValue);
    console.log("Prompt Value (Chat Messages): ", promptValue.toChatMessages());

	const response = await model.invoke(promptValue);
	console.log("Response: ", response.content);
}

main();
