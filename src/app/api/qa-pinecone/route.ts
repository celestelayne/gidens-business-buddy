// for LangChain
import { Pinecone } from "@pinecone-database/pinecone"; // why is this not working?
import { OpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { BaseCallbackHandler } from "@langchain/core/callbacks/base";
// for vectorstore and embeddings
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { StreamingTextResponse, LangChainStream } from "ai";

import dotenv from "dotenv";
dotenv.config({ path: `.env.local` });

// fucntion to handle POST request
export async function POST(request: Request) {
  const { prompt } = await request.json();

  console.log(prompt)
  /* Instantiate a new Pinecone client, which will automatically read the
      env vars: PINECONE_API_KEY and PINECONE_ENVIRONMENT which come from
      the Pinecone dashboard at https://app.pinecone.io
  */
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || ""
  });

  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX || "");

  // Create vector store from existing Pinecone index, https://app.pinecone.io/
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
    { pineconeIndex }
  );

  const { stream, handlers } = LangChainStream();

  console.log("stream", stream);
  console.log("handlers", handlers);

  /* Initialize the LLM to use to answer the question */
  const model = new OpenAI({
    streaming: true,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
    callbacks: [BaseCallbackHandler.fromMethods(handlers)],
  });

  // Create Conversation Chain object
  const chain = new ConversationChain({
    llm: model,
  });
  chain.invoke({ memory: vectorStore }).catch(console.error);
  chain.invoke({ input: prompt }).catch(console.error);

  return new StreamingTextResponse(stream);
}
