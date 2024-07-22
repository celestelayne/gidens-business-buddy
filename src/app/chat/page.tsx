'use client'
import React, { useState }  from "react";

import ThreeColumnLayout from "@/components/ThreeColumnLayout";
import ChatHistory from "@/components/ChatHistory";
import PromptBox from "@/components/PromptBox";
import ResultsWithSources  from "@/components/ResultsWithSources";
import SideNav from "@/components/SideNav";

export default function Chat() {

    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    // const [firstMessage, setFirstMessage] = useState(true);

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    }

    const handleSubmitPrompt = async () => {
        console.log("Prompt submitted: ", prompt);

        try {
            setMessages(prevMessages => [
                ...prevMessages, 
                { 
                    text: prompt,
                    type: "user", 
                }
            ])
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                },
                body: JSON.stringify({ input: prompt })
            })

            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setPrompt("");
            // set first message to false after first message is sent so as not to reinitialize the chain
            // setFirstMessage(false);
            const searchResponse = await response.json();
            // add the bot message to the chat history
            setMessages(prevMessages => [
                ...prevMessages, 
                { 
                    text: searchResponse.output.response,
                    type: "bot", 
                }
            ])
            
            console.log({ searchResponse }); // browser response { searchResponse: { input: 'what is my name' } }
            // clear old error messages
            setError("")

        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    return (
        <main className="flex min-h-screen flex-col p-8">
            <ThreeColumnLayout 
                leftChildren={
                    <>
                        <SideNav />
                    </>
                }
                middleChildren={
                    <>
                        <ChatHistory />
                    </>
                } 
                rightChildren={
                    <>
                        <ResultsWithSources messages={messages} pngFile="brain" maxMsgs={5}/>
                        <PromptBox
                            prompt={prompt}
                            handleSubmit={handleSubmitPrompt}
                            handlePromptChange={handlePromptChange}
                            error={error}
                        />
                    </>
                }
            />
        </main>
    )
}