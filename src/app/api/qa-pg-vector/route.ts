import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { VectorDBQAChain } from "langchain/chains";
import { StreamingTextResponse, LangChainStream } from "ai";
import { CallbackManager } from "langchain/callbacks";

dotenv.config({ path: `.env.local` });

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const privateKey = process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY;
  if (!privateKey) throw new Error(`Expected env var NEXT_PUBLIC_SUPABASE_PRIVATE_KEY`);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error(`Expected env var NEXT_PUBLIC_SUPABASE_URL`);

  const auth = {
    detectSessionInUrl: false,
    persistSession: false,
    autoRefreshToken: false,
  };
  const client = createClient(url, privateKey, { auth });

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
    {
      client,
      tableName: "documents",
      queryName: "match_documents",
    }
  );

  const { stream, handlers } = LangChainStream();

  const model = new OpenAI({
    streaming: true,
    modelName: "gpt-3.5-turbo-16k",
    openAIApiKey: process.env.OPENAI_API_KEY,
    callbackManager: CallbackManager.fromHandlers(handlers),
  });

  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 1,
    returnSourceDocuments: false,
  });

  chain.call({ query: prompt }).catch(console.error);
  return new StreamingTextResponse(stream);
}
