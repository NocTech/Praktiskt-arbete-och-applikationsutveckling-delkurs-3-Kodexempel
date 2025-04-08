import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});

/*

Vi kan tänka på en “thread” som en konversation som startas av 
användaren och det är den som håller reda på historiken över konversationen.

Vi skulle kunna tänka oss att vi har en “thread” per user ex.

*/

async function main() {
	// Assistant variables
	const asstID = "asst_6I6Oofgr4SJBIyPrZ8u6naK6";

	// Create a thread
	const thread = await openai.beta.threads.create();
	console.log(thread);
	//Här vill vi få ut thread id
	//thread_TuKGY7hN0QFJe5o7w4q0OXQp
	/*
    {
  id: 'thread_ZJg6ydzZNmceWopA3WiUluB6',
  object: 'thread',
  created_at: 1743968490,
  metadata: {},
  tool_resources: {}
}
    */
}

main();
