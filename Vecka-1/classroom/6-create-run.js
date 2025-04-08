/* https://platform.openai.com/docs/api-reference/runs/createRun

För att sen köra assistenten behöver vi köra en run
den läser threaden och listar på så sätt ut om den behöver 
använda några verktyg eller om den behöver köra kod-verktyget etc. */

import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});

// Run the assistant's thread
async function runThread() {
	const threadID = "thread_TuKGY7hN0QFJe5o7w4q0OXQp";
	const asstID = "asst_6I6Oofgr4SJBIyPrZ8u6naK6";
	const run = await openai.beta.threads.runs.create(
		threadID,
		{ assistant_id: asstID }
		//Här kan vi lägga till tools för den specifika körningen om så behövs.
	);
	console.log(run);
	//Vi behöver run id för att kunna hämta från run

	/*
  {
  id: 'run_JPAETo1CICc85BjanYy5I6AE',
  object: 'thread.run',
  created_at: 1743968624,
  assistant_id: 'asst_FW1I1L9LeWmIt5xcU6EQrpPU',
  thread_id: 'thread_ZJg6ydzZNmceWopA3WiUluB6',
  status: 'queued',
  started_at: null,
  expires_at: 1743969224,
  cancelled_at: null,
  failed_at: null,
  completed_at: null,
  required_action: null,
  last_error: null,
  model: 'gpt-4o-mini',
  instructions: 'You are an expert history analyst. Use you knowledge base to answer questions about history.',
  tools: [ { type: 'file_search', file_search: [Object] } ],
  tool_resources: {},
  metadata: {},
  temperature: 1,
  top_p: 1,
  reasoning_effort: null,
  max_completion_tokens: null,
  max_prompt_tokens: null,
  truncation_strategy: { type: 'auto', last_messages: null },
  incomplete_details: null,
  usage: null,
  response_format: 'auto',
  tool_choice: 'auto',
  parallel_tool_calls: true
}
  */
}

/*

Vad får vi tillbaka?

- ett run objekt och detta runobjekt innehåller en run-körning på den nuvarande “tråden”
- En viktig information är “status” propertyn

https://platform.openai.com/docs/assistants/deep-dive#runs-and-run-steps

- When a run is created it’s queued
- then in progress (när den kör verktyg, svarar på frågan etc)
- completed, när den är klar.
- expired (om något tar för lång tid att köras)
- failed (något gick fel)

*/

runThread()