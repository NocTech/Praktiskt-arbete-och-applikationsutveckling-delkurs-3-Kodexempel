/* Sen kan vi skapa messages:

https://platform.openai.com/docs/api-reference/messages/createMessage

Messages är helt enkelt meddelandena som skickas i en specifik thread.

Vi behöver göra en request till threads endpoint

Vi känner igen role och content från tidigare llm interaktioner

Vi behöver skicka in threadID */

import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});

// Create a message for the thread
async function createMessage() {
	const threadID = "thread_TuKGY7hN0QFJe5o7w4q0OXQp";
	const threadMessages = await openai.beta.threads.messages.create(threadID, {
		role: "user",
		content: "Who wrote the clockmaker apprentice?",
	});
	console.log(threadMessages);
	/*
  {
  id: 'msg_rE1mMNpinrIkwKsUsuVn4tBo',
  object: 'thread.message',
  created_at: 1743968548,
  assistant_id: null,
  thread_id: 'thread_ZJg6ydzZNmceWopA3WiUluB6',
  run_id: null,
  role: 'user',
  content: [ { type: 'text', text: [Object] } ],
  attachments: [],
  metadata: {}
}
  */
}
createMessage()