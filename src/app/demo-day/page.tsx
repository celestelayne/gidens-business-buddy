// aloows us to import useState in NextJS
'use client'
import React, { useState }  from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import PromptBox from "@/components/PromptBox";
import ResultsWithSources  from "@/components/ResultsWithSources";

export default function DemoDay() {

    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState<any[]>([
        {
            type: 'bot',
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
        <>
            <Grid
                display="flex"
                size={{ xs: 12, md: 9 }}
                sx={{
                boxShadow: 0,
                height: { xs: '100vh', md: '100vh' },
                padding: { xs: '1rem 0.5rem', md: '1rem' },
                overflow: 'hidden',
            }}>
                <Box
                    component="section"
                    sx={() => ({
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        gap: 0,
                        width: '100%',
                    })}>
                    <Box sx={{ overflow: 'scroll' }}>
                        <ResultsWithSources messages={messages} pngFile="brain" maxMsgs={5}/>
                    </Box>
                    <Box sx={{ padding: { xs: '0', md: '1rem' } }}>
                        <PromptBox
                            prompt={prompt}
                            handleSubmit={handleSubmitPrompt}
                            handlePromptChange={handlePromptChange}
                            error={error}
                        />
                    </Box>
                </Box>
            </Grid>
        </>
    )
}