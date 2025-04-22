import OpenAI, { toFile } from "openai";

// Initialize OpenAI client
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
if (!apiKey) {
	throw new Error(
		"OpenAI API key not found. Please add it to your .env file (VITE_OPENAI_API_KEY=...)."
	);
}

const openai = new OpenAI({
	apiKey: apiKey,
	dangerouslyAllowBrowser: true, // IMPORTANT: Only for testing/demo purposes
});

// ---------------------------- Steg 1 - Läs igenom instruktionerna ----------------------------
/*

Läs README.md om du inte redan gjort detta.

Nedan finns ett antal funktioner som inte har implementerats än.
Uppgiften är att implementera dessa funktioner så att applikationen fungerar.
När ni implementerat funktionerna så kan ni köra applikationen genom att skriva "npm run dev" i terminalen.

Det finns två let variabler nedan.

currentVectorStoreId är id:t för den vektor databas som används för att söka i.
Detta är initialt "null" eftersom vi inte har skapat en vektor databas än.
Så fort ni skapat en vektor databas så kan ni sätta denna variabel till id:t för den nya vektor databasen.

previousResponseId är id:t för den senaste responsen från responses api:t.
Detta är också initialt "null" men behöver uppdateras i funktionen callResponsesAPI.
Så att användaren kan förtsätta konversationen med en ny prompt.

*/

let currentVectorStoreId = null;
let previousResponseId = null;

// ---------------------------- Steg 2 - Förstå anropen ----------------------------

/* 
Funktionen nedan anropas när användaren valt en fil och klickat på "Upload and create vector store"

*/

export async function uploadFileAndCreateVectorStore(file) {
	//Först skickas filen till uploadFile funktionen nedan.
	//Från denna funktion vill vi få tillbaka ett fileId från openai.files.create()
	const fileId = await uploadFile(file);

	//Sedan skickas fileId till createVectorStore funktionen nedan.
	//Från denna funktion vill vi få tillbaka ett vectorStoreId från openai.vectorStores.create()
	//Kopiera gärna vectorStoreId och spara det i currentVectorStoreId variabeln ovan om ni vill undvika att skapa en ny vektor databas varje gång.
	//Alltså efter första gången ni har skapat en vektor databas så kan ni
	//byta ut let variablen högst upp i filen mot detta vectorStoreId.
	//och skriva:
	//const vectorStoreId = currentVectorStoreId;
	const vectorStoreId = await createVectorStore("My vector store");
    console.log(vectorStoreId);

	//Sedan skickas fileId och vectorStoreId till attachFileToVectorStore funktionen nedan.
	//Denna funktion kopplar ihop filen med vektor databasen.
	await attachFileToVectorStore(fileId, vectorStoreId);

	//Sedan returneras fileId och vectorStoreId till användaren. Och visas upp i gränssnittet.
	return { fileId, vectorStoreId };
}

// ---------------------------- Steg 3 - Implementera filhanteringen ----------------------------

async function uploadFile(file) {
	//Först skickas filen till toFile funktionen nedan.
	//Detta är en hjälpfunktion som omvandlar filen till en fil som kan skickas till openai.
    //Detta anrop borde egentligen göras på en node server och inte på frontend. Men för nu kan vi låta det vara så.
	const fileForUpload = await toFile(file, file.name);

	//Här vill jag att ni anropar openai.files.create()
	//Se https://platform.openai.com/docs/guides/pdf-files#uploading-files
	//(men istället för fs.createReadStream som de gör i dokumentationen så får ni använda fileForUpload)
	const uploadedFile = null;
	return uploadedFile.id;
}

async function createVectorStore(name) {
	//Här vill jag att ni anropar openai.vectorStores.create()
	//Se https://platform.openai.com/docs/api-reference/vector-stores/create?lang=node.js
	const vectorStore = null;
	return vectorStore.id;
}

async function attachFileToVectorStore(fileId, vectorStoreId) {
	//Här vill jag att ni anropar openai.vectorStores.files.create()
	//Se https://platform.openai.com/docs/api-reference/vector-stores-files?lang=node.js
	
}

// ---------------------------- Steg 4 - Implementera responses api och anrop till en "assistent" ----------------------------

export async function callResponsesAPI(query, instructions) {
	//Här vill jag att ni anropar openai.responses.create()
	//Se https://platform.openai.com/docs/api-reference/responses/create?lang=javascript
    //Se till att inkludera parametrarna input, instructions, previous_response_id samt tools
	const response = null;

	//Sedan vill jag att ni sparar id:t från svaret i previousResponseId variabeln ovan.
	previousResponseId = null;

	
    // Här returnerar vi hela svaret till ui.js
	return response;
}
