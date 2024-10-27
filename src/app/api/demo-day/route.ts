import dotenv from "dotenv";
dotenv.config({ path: `.env.local` });

import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";

// You can set the project name for a specific tracer instance:
import { LangChainTracer } from "@langchain/core/tracers/tracer_langchain";

const tracer = new LangChainTracer({ 
    projectName: "pr-memorable-campaign-88" 
});

/*
    1. Basic Multi-turn Conversation with Memory (No RAG)
    2. Making the Model Proactive
*/

let model, memory, chain;

export async function POST(req: NextRequest) {
    try {
        const { input, firstMessage } = await req.json();
        console.log('This is the chat input from user: ', input);

        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                `You are a proactive assistant who guides the conversation by asking the user questions about applying for a vendors license. 
                Limit the answer to one brief sentence at a time. 
                Begin by alerting the user who is a small business owner in the food service industry to an incoming notification about an upcoming event at Blue Startups called Demo Day on September 26th. 
                Kalani offers catering services and a food truck. 
                This is Kalani's first time being a vendor. 
                Ask Kalani if he's been a vendor before. 
                Do not ask Kalani for the name of his business and contact information.
                If he has not been a vendor before, let him know what license he needs and let him know you can fill out the application on his behalf.`,
            ],
            new MessagesPlaceholder("chat_history"),
            ["user", "{input}"],
        ]);

        if(!input){
            throw new Error("No input provided.");
        }

        if(firstMessage){
            console.log('initializing chain');
            model = new ChatOpenAI({
                model: "gpt-3.5-turbo",
                openAIApiKey: process.env.OPENAI_API_KEY as string,
                temperature: 0.3,
                maxTokens: 2048,
                topP: 1,
                frequencyPenalty: 0,
            })
            memory = new BufferMemory({ 
                returnMessages: true, 
                memoryKey: "chat_history" 
            });
            chain = new ConversationChain({
                memory: memory,
                prompt: prompt,
                llm: model,
            });
        }

        console.log('input  ', input);

        const response = await chain.invoke(
            {
                input: input,
            },
            { callbacks: [tracer] }
        );
        
        console.log('response   ', response);

        // Return the response back to the client
        return NextResponse.json({ output: response }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
    }
};