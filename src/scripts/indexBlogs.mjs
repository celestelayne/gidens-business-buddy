// Major ref: https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/pinecone
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import fs from "fs";
import path from "path";

dotenv.config({ path: `.env.local` });

const MAX_TOKENS = 8191;

const fileNames = fs.readdirSync("blogs");

// Helper function to chunk a string into smaller parts
const chunkString = (str, length) => {
  const size = Math.ceil(str.length / length);
  const r = Array(size);
  let offset = 0;

  for (let i = 0; i < size; i++) {
    r[i] = str.substr(offset, length);
    offset += length;
  }

  return r;
};

const lanchainDocs = [];

fileNames.forEach((fileName) => {
  const filePath = path.join("blogs", fileName);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const chunks = chunkString(fileContent, MAX_TOKENS);
  
  chunks.forEach((chunk, index) => {
    lanchainDocs.push(new Document({
      metadata: { fileName, chunkIndex: index },
      pageContent: chunk,
    }));
  });
});

/* 
    Instantiate a new Pinecone client, which will automatically read the
    env vars: PINECONE_API_KEY and PINECONE_ENVIRONMENT which come from
    the Pinecone dashboard at https://app.pinecone.io
*/
const client = new Pinecone({
  apiKey: "32d68159-76d2-45cf-ae95-af5b08c482b5"
});
// await client.init({
//   apiKey: process.env.PINECONE_API_KEY
// });
const pineconeIndex = client.Index("ai-getting-started");

await PineconeStore.fromDocuments(
  lanchainDocs,
  new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
  {
    pineconeIndex,
  }
);
