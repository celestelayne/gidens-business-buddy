import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";

import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";



dotenv.config({ path: `.env.local` });

export async function POST(request: Request) {

    const user = await currentUser();

    try {
        const { input } = await request.json()
        console.log(input) // server response { input: 'what is my name' }

        if(!input){
            throw new Error("No input provided.");
        }

        /*
            ========== PINECONE ==========
        */

        const pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY as string,
        });
    
        const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX || "");

        // Create vector store from existing Pinecone index
        const vectorStore = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
            { pineconeIndex }
        );

        /*
            ========== LANCHAIN / OPENAI ==========
        */

        const model = new ChatOpenAI({
            model: "gpt-3.5-turbo",
            openAIApiKey: process.env.OPENAI_API_KEY as string,
            temperature: 0.3
        })

        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system", `Answer the questions based on the below context: 
                
                {context}`
            ],
            new MessagesPlaceholder("chat_history"),
            ["human", "{input}"],
        ]);

        const promptSearchQuery = ChatPromptTemplate.fromMessages([
            new MessagesPlaceholder("chat_history"),
            ["user", "{input}"],
            [
                "user",
                "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
            ],
        ]);

        const chatHistory = [
            new HumanMessage(`Hello, I'm ${user.firstName}.`),
            new AIMessage(`Nice to meet you, ${user.firstName}!`),
        ];

        const historyAwareRetrieverChain = await createHistoryAwareRetriever({
            llm: model,
            retriever: vectorStore.asRetriever(),
            rephrasePrompt: promptSearchQuery,
        });

        const combineDocsChain = await createStuffDocumentsChain({
            llm: model,
            prompt: prompt
        });

        const chain = await createRetrievalChain({
            retriever: historyAwareRetrieverChain,
            combineDocsChain,
        });
        
        const response = await chain.invoke({ 
            chat_history: chatHistory,
            input: input,
        });
        
        console.log(response.answer)

        return NextResponse.json({ output: response }, { status: 200 });
    } catch (e) {
        throw e;
    }
}