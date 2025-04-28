import "./style.css";
import OpenAI from "openai";

const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");



// Initialize OpenAI client
const client = new OpenAI({
	apiKey: import.meta.env.VITE_OPEN_AI_KEY,
	dangerouslyAllowBrowser: true, // DON'T DO THIS IN PRODUCTION
});

function addMessage(content, isUser = false) {
	const messageDiv = document.createElement("div");
	messageDiv.className = `message ${
		isUser ? "user-message" : "assistant-message"
	}`;
	messageDiv.textContent = content;
	chatMessages.appendChild(messageDiv);
	chatMessages.scrollTop = chatMessages.scrollHeight;
}

const history = []; // Hur kan denna användas för att hålla konversationen i minnet?

async function streamResponse(prompt) {
	
	try {
        //Kan vi instruera modellen att inte använda markdown? Eller parsa markdownen på något sätt? Kan vi be den skriva kortare svar?
		const response = await client.responses.create({
			model: "gpt-4o-mini",
			input: prompt,
			tools: tools,
			stream: false,
		});

		const lastMessage = chatMessages.lastElementChild;
		if (lastMessage) {
			lastMessage.textContent = response.output_text;
		}
	} catch (error) {
		console.error("Error:", error);
		addMessage("Sorry, there was an error processing your request.", false);
	}
}

chatForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const message = userInput.value.trim();
	if (!message) return;

	// Add user message
	addMessage(message, true);
	userInput.value = "";

	// Add empty assistant message that will be updated
	addMessage("", false);

	// Stream the response
	await streamResponse(message);
});

// Focus input on load
userInput.focus();

//Fake function call

async function retrieveDataBetweenDates(start_date, end_date) {
	console.log("Retrieving data between dates:", start_date, end_date);
	// Simulate a delay of 5 seconds
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return `Entry 1 (2025-04-20): Today was a good day. I had lunch with my friend Julia. We went to a delicious restaurant called "The Gourmet".
            Entry 2 (2025-04-17): The sun was shining today and it was beautiful, the trees are starting to blossom.
            Entry 3 (2025-04-19): I'm having a great time right now, birds are singing and I can feel spring is coming!`;
}
const tools = [
	{
		type: "function",
		name: "retrieveDataBetweenDates",
		description: "Retrieves data from Supabase in between two specified dates",
		strict: true,
		parameters: {
			type: "object",
			required: ["start_date", "end_date"],
			properties: {
				start_date: {
					type: "string",
					description:
						"The start date for the data retrieval in ISO 8601 format",
				},
				end_date: {
					type: "string",
					description: "The end date for the data retrieval in ISO 8601 format",
				},
			},
			additionalProperties: false,
		},
	},
];
