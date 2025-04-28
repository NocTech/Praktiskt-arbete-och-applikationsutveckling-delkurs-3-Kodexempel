import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "openai";
const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const MEMORY_FILE = "./memory_bank.json";

const exampleFunctionSchema = {
	type: "function",
	name: "functionName",
	description: "Description of the function",
	parameters: {
		type: "object",
		properties: {
			property1: {
				type: "string",
				description: "Description of property1",
			},
		},
		additionalProperties: false,
	},
	strict: true, // If true, the function schema must be followed exactly. If false, the function schema is used as a guide.
};

// Uppgift här är att skriva en schema för en funktion som kan användas för att lägga till en text i minnet.
//Få hjälp att skriva ett schema med hjälp av exampleFunctionSchema ovan eller OpenAIs schema generator.
//Se: https://platform.openai.com/docs/guides/function-calling?api-mode=responses#:~:text=Take%20a%20look%20at%20this%20example%20or%20generate,Generate
const addToMemorySchema = {};


async function chatWithMemory(prompt) {
	const memory = getMemory();
	try {
		//Vi behöver lägga till någonting här som vi skickar in till responses.create - vad kan det vara?
		//Se: https://platform.openai.com/docs/guides/function-calling?api-mode=responses
		//Kan vi instruera modellen att inte använda markdown? Eller parsa markdownen på något sätt? Kan vi be den skriva kortare svar?
		const response = await client.responses.create({
			model: "gpt-4o-mini",
			input: "Previous memories: " + memory + "\n" + "Users prompt: " + prompt,
			stream: false,
		});

		console.log(JSON.stringify(response, null, 2));

		for (const item of response.output) {
			if (item.type !== "function_call") {
				console.log("Not a function call");
				console.log(item);
				continue;
			}

			const name = item.name;
			const args = JSON.parse(item.arguments);

			if (name === "addToMemory") {
				// dispatch to your real function
				await addToMemory(args.memoryText, args.expires);
				console.log("Added to memory:", args.memoryText);
			}
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

let memoryBank = [];

async function loadMemory() {
	try {
		memoryBank = JSON.parse(await fs.readFile(MEMORY_FILE, "utf8"));
	} catch {
		memoryBank = [];
	}
}
async function saveMemory() {
	await fs.writeFile(MEMORY_FILE, JSON.stringify(memoryBank, null, 2));
}

export async function addToMemory(memoryText, expires = false) {
	memoryBank.push({ text: memoryText, expires: expires });
	await saveMemory();
}

export function getMemory() {
	return memoryBank.map((m) => m.text).join("\n");
}

/* ---------- main ---------- */
async function main() {
	await loadMemory();
	//await chatWithMemory("My name is Joel! :)");
	await chatWithMemory("What is my name?");
}

main();
