import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";

import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";

import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";

import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

import { currentUser } from '@clerk/nextjs/server';

export async function POST(request: Request) {

    const user = await currentUser();

    try {
        const { input } = await request.json()
        console.log(input) // server response { input: 'what is my name' }

        if(!input){
            throw new Error("No input provided.");
        }

        const model = new ChatOpenAI({
            model: "gpt-3.5-turbo",
            openAIApiKey: process.env.OPENAI_API_KEY as string,
            temperature: 0,
        })

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", `You are a small business advisor called Gidens having a conversation with a small business owner. Please call me by my first name.`],
            new MessagesPlaceholder("chat_history"),
            ["human", "{input}"],
        ]);

        const pastMessages = [
            new HumanMessage(`Hello, I'm ${user.firstName}.`),
            new AIMessage(`Nice to meet you, ${user.firstName}!`),
        ];

        const chatPromptMemory = new BufferMemory({ 
            memoryKey: "chat_history",
            returnMessages: true,
            chatHistory: new ChatMessageHistory(pastMessages),
        });

        const chain = new ConversationChain({
            llm: model,
            prompt,
            verbose: true,
            memory: chatPromptMemory,
        });
        
        const response = await chain.invoke({ input });    
        
        console.log({ response })

        return NextResponse.json({ output: response }, { status: 200 });
    } catch (e) {
        throw e;
    }
}
