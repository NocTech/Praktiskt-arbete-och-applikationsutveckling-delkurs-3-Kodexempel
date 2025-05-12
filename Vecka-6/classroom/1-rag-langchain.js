

// 1. Läs in PDF -> PDFLoader
// npm install pdf-parse @langchain/community @langchain/openai @langchain/core @supabase/supabase-js
// 2. Dela upp PDFen i delar (chunks)
// TextSplitter
// 3. Ta alla chunks och skapa embeddings + ladda upp till Supabase
// En embeddingmodell, skriva supabase funktioner på klienten
//Skapa tabellen som ska ta emot våra embeddings.
// Langchains VectorStores -> Supabase
// 4. Söka efter relevanta chunks med embeddings
// För att söka i databasen så används fortfarande en funktion i SQL hos supabase







