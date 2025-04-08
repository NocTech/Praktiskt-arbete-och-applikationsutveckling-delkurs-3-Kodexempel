import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

async function createFile() {
	const file = await openai.files.create({
		file: fs.createReadStream("short-story.pdf"),
		purpose: "assistants",
	});
	console.log(file);
	console.log("File created, ID is: ", file.id);

	return file.id;
}

async function addFileToVectorStore(fileId) {
	const vectorStore = await openai.vectorStores.create({
		name: "Short stories 4",
	});
	console.log(vectorStore);
	console.log("Vector store created, ID is: ", vectorStore.id);

	await openai.vectorStores.files.create(vectorStore.id, {
		file_id: fileId,
	});
	console.log("File added to vector store");
	//vs_67f408b83f94819188e5cdd47786a8b1
}

async function main() {
	//const fileId = await createFile();
	//console.log("File ID: ", fileId);
	await addFileToVectorStore("file-LFhrQVdzzKhbKzQZWn45rb");
}

main();
