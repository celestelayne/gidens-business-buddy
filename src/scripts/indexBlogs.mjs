// Major ref: https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/pinecone
import { Pinecone } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import fs from "fs";
import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: `.env.local` });

const MAX_TOKENS = 8191;

  // Form the local path to the PDFs documents
  const docsPath = path.resolve(process.cwd(), 'blogs/')
  
  const loader = new DirectoryLoader(docsPath, {
    '.pdf': (filePath) => new PDFLoader(filePath),
  });
  
  // Load all PDFs within the specified directory
  console.log("Loading docs...");
  const docs = await loader.load();
  console.log("Docs loaded.");
  
  console.log(docs.length);
  console.log(docs[0].pageContent.slice(0, 100));
  console.log(docs[0].metadata);

  // Split text into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splitDocs = await textSplitter.splitDocuments(docs);
  
  console.log('how many split documents: ', splitDocs.length ); // 24

  /* 
    Instantiate a new Pinecone client, which will automatically read the
    env vars: PINECONE_API_KEY and PINECONE_ENVIRONMENT which come from
    the Pinecone dashboard at https://app.pinecone.io
  */
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
  });
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
  console.log('PINECONE_INDEX =====', { pineconeIndex });

  // create a pinecone store using the splitted docs and the pinecone index
  await PineconeStore.fromDocuments(
    splitDocs,
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
    {
      pineconeIndex,
      namespace: "gidens-business-buddy",
      maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    }
  );
