'use client'
import React, { useState, useEffect }  from "react";
import { useSession, useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';

import TwoColumnLayout from "@/components/TwoColumnLayout";
import ChatHistory from "@/components/ChatHistory";
import PromptBox from "@/components/PromptBox";
import ResultsWithSources  from "@/components/ResultsWithSources";

export default function Chat() {

    // set state
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState(null);

    // The `useUser()` hook will be used to ensure that Clerk has loaded data about the logged in user
    const { user } = useUser();
    console.log(user)

    // The `useSession()` hook will be used to get the Clerk session object
    const { session } = useSession();

    // Create a custom supabase client that injects the Clerk Supabase token into the request headers
    const createClerkSupabaseClient = () => {
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_KEY!, 
            {
                global: {
                    // Get the custom Supabase token from Clerk
                    fetch: async (url, options = {}) => {
                        const clerkToken = await session?.getToken({
                        template: 'supabase',
                        });
            
                        // Insert the Clerk Supabase token into the headers
                        const headers = new Headers(options?.headers);
                        headers.set('Authorization', `Bearer ${clerkToken}`);
            
                        // Now call the default fetch
                        return fetch(url, {
                        ...options,
                        headers,
                        });
                    },
                },
            }
        );
    }

    // Create a `client` object for accessing Supabase data using the Clerk token
    // const client = createClerkSupabaseClient();

    


    // This `useEffect` will wait for the User object to be loaded before requesting the messages for the logged in user
    // useEffect(() => {
    //     if (!user) return;
    //     // fetch messages from Supabase
    //     async function loadMessages() {
    //         setLoading(true);
    //         const { data, error } = await client.from('messages').select();
    //         if (!error) setMessages(data);
    //         setLoading(false);
    //     }
    //     loadMessages();
    // }, [user])



    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    }

    const handleSubmitPrompt = async () => {

        console.log("Prompt submitted: ", prompt);
        
        try {

            setMessages([...messages, { text: prompt, type: "user" }]);
            
            // setMessages(prevMessages => [
            //     ...prevMessages, 
            //     { 
            //         text: prompt,
            //         type: "user", 
            //     }
            // ])

            console.log("Send to OpenAI: ", messages);

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
            const searchResponse = await response.json();
            // add the bot message to the chat history
            setMessages(prevMessages => [
                ...prevMessages, 
                { 
                    text: searchResponse.output,
                    type: "bot", 
                }
            ])

            console.log("Response from OpenAI: ", messages);
            
            console.log('search response', { searchResponse }); // browser response { searchResponse: { input: 'what is my name' } }
            // clear old error messages
            setError("")
            
        } catch (error) {
            console.error(error);
            setError(error);
        }

        setLoading(false);
    }
    
    return(
        <main className="flex flex-col">
            <TwoColumnLayout 
                leftChildren={
                    <>
                        {loading && <p>Loading...</p>}

                        {!loading &&
                            messages.length > 0 &&
                            <ChatHistory messages={messages}/>
                        }

                        {!loading && messages.length === 0 && <p>No messages found for {user.firstName}</p>}
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