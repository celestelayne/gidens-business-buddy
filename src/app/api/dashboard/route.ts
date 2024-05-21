import { NextResponse } from "next/server";
import { OpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

let model;
let memory;
let chain: any;

export async function POST(request: Request, res: NextResponse) {

    try {
        const { input, firstMessage } = await request.json()
        console.log(input) // server response { input: 'what is my name' }

        if(!input){
            throw new Error("No input provided.");
        }

        if(firstMessage){
            console.log("initializing chain")
            model = new OpenAI({
                model: "gpt-3.5-turbo",
                openAIApiKey: process.env.OPENAI_API_KEY as string,
                temperature: 0,
            }),
            memory = new BufferMemory(),
            chain = new ConversationChain({ llm: model, memory: memory })
        }

        console.log({ input })
        const response = await chain.call({ input })
        console.log(response)

        return NextResponse.json({ output: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Only POST method allowed: ${error}`,}, { status: 500 } );
    }
}