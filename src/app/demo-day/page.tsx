// aloows us to import useState in NextJS
'use client'
import React, { useState }  from "react";

import PromptBox from "@/components/PromptBox";
import ResultsWithSources  from "@/components/ResultsWithSources";

export default function DemoDay() {

    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState<any[]>([
        {
            type: 'bot',
            // text: 'Hey! What is your name and favorite food?',
            text: 'Hey Kalani, Blue Startups is hosting an event on September 26th, just 1 mile from your spot. Would you like more information?',
        }
    ]);
    const [firstMessage, setFirstMessage] = useState(true);

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    }

    const handleSubmitPrompt = async () => {

        console.log("Sending prompt: ", prompt);
        
        try {

            setMessages(prevMessages => [
                ...prevMessages, 
                {
                    text: prompt,
                    type: 'user',
                },
            ])

            console.log("Sending to OpenAI:", JSON.stringify(messages));

            const response = await fetch("/api/demo-day", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                },
                body: JSON.stringify({ input: prompt, firstMessage })
            })

            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setPrompt("");
            setFirstMessage(false);

            // set first message to false after first message is sent so as not to reinitialize the chain
            const searchResponse = await response.json();
            console.log('Search response: ', {searchResponse});

            // add the bot message to the chat history
            setMessages(prevMessages => [
                ...prevMessages, 
                { 
                    text: searchResponse.output.response,
                    type: "bot", 
                }
            ])
            
            // clear old error messages
            setError("")
            
        } catch (error) {
            console.error(error);
            setError(error);
        }

    }

    return(
        <main>
            <ResultsWithSources messages={messages} pngFile="brain" maxMsgs={5}/>
            <PromptBox
                prompt={prompt}
                handleSubmit={handleSubmitPrompt}
                handlePromptChange={handlePromptChange}
                error={error}
            />
        </main>
    )
}