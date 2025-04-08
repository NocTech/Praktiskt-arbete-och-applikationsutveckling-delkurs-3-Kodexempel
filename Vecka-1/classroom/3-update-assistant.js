import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});

async function updateAssistant() {
	const assistant = await openai.beta.assistants.retrieve(
		"asst_6I6Oofgr4SJBIyPrZ8u6naK6"
	);

    const vectorStoreId = "vs_67f408b83f94819188e5cdd47786a8b1";

	await openai.beta.assistants.update(assistant.id, {
		tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } },
	});
}

updateAssistant()