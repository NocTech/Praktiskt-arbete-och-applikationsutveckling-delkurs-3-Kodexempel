import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_API_KEY,
});

async function callResponsesAPI(query) {
	const vectorStoreId = "vs_67fd2dff5b6081919be5a4400dd0190c";
	const response = await openai.responses.create({
		model: "gpt-4o-mini",
		input: query,
		instructions:
			"You are a helpful assistant that can answer questions about return policies and or other customer service questions for BrightGood Inc. Always reply in the language of the question and remember that you are a chatbot so don't include references to any context.",
		tools: [
			{
				type: "file_search",
				vector_store_ids: [vectorStoreId],
				//max_num_results: 1,
				/* ranking_options: {
					score_threshold: 0.55, //Här kan vi sätta score threshold för att filtrera resultat med responses api (görs på samma sätt för assistant api)
				},  */
			},
		],
		include: ["output[*].file_search_call.search_results"],
	});

	console.log(response.output_text);
	console.log(JSON.stringify(response, null, 2));
	/* const secondQuery = "Oh I see, what about a banana? Can I return that?";

	const secondResponse = await openai.responses.create({
		model: "gpt-4o-mini",
		previous_response_id: response.id,
		input: secondQuery,
		instructions:
			"You are a helpful assistant that can answer questions about return policies and or other customer service questions for BrightGood Inc. Always reply in the language of the question and remember that you are a chatbot so don't include references to any context.",
	});

	console.log(secondResponse.output_text); */

	//return response;
}

async function main() {
	const query =
		"How will I get a refund?";
	await callResponsesAPI(query);
}

main();
