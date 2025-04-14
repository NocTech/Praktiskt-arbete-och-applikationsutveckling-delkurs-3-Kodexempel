import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_API_KEY,
});

// ------------------------------------------------------------

// Upload a file and attach to vector store

// ------------------------------------------------------------

async function uploadFile(filePath) {
	const file = await openai.files.create({
		file: fs.createReadStream(filePath),
		purpose: "assistants",
	});
	console.log(file);
	console.log(file.id);
	return file.id;
}

async function listFiles() {
	const files = await openai.files.list();
	console.log(files.data);
}


//listFiles();

async function createVectorStore() {
	const vectorStore = await openai.vectorStores.create({
		name: "BrightGood Company Documents",
	});
	console.log(vectorStore);
	console.log(vectorStore.id);
	return vectorStore.id;
}

async function attachFileToVectorStore(fileId, vectorStoreId) {
	const vectorStoreFile = await openai.vectorStores.files.create(
		vectorStoreId,
		{
			file_id: fileId,
		}
	);
	console.log(vectorStoreFile);
}

async function main() {
	const fileId = await uploadFile("customer-service.pdf");
	
	await attachFileToVectorStore(fileId, "vs_67fd2dff5b6081919be5a4400dd0190c");
}

main();

//createVectorStoreAndAttachFile("file-FeLYcUvaZACNHNk4fTytci");
