import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const MessageItem = ({ message, pngFile }) => {

    const [showSources, setShowSources] = useState(false);

    const userImage = `/assets/images/green-square.png`;
    const botImage = `/assets/images/${pngFile}.png`;

    return(
        <>
            <ListItem sx={{ justifyContent: messageAlignment }}>
                {!isHuman && (
                    <ListItemAvatar>
                        <Avatar
                            src={message.type === "user" ? userImage : botImage}
                            alt={`${message.type}'s profile image`}
                            sx={{ 
                                width: 32, 
                                height: 32, 
                                border: `1px solid ${gidensBlue}` 
                            }}
                        />
                    </ListItemAvatar>
                )}
                <ListItemText
                    primary={message.content}
                    sx={{
                        background: isHuman ? '#fff' : '#E9EFF1',
                        border: isHuman ? `1px solid ${gidensBlue}` : `none`,
                        borderRadius: '1rem',
                        color: isHuman ? gidensBlue : '#000',
                        display: 'inline-flex',
                        flex: '0 1 auto',
                        padding: '0.5rem 1rem',
                }}>
                    {message.text}
                </ListItemText>
            </ListItem>
        </>
    )
}

const ResultsWithSources = ({ messages, pngFile, maxMsgs }) => {

    console.log('chat message history', messages)

    const messagesContainerRef = useRef<HTMLDivElement>(null);
    console.log(messagesContainerRef)

    useEffect(() => {
        if (messagesContainerRef.current) {
            const element = messagesContainerRef.current;
            console.log(element)
            element.scrollTop = element.scrollHeight;
        }
    }, [messages]);

    // before reaching the max number of messages, add justify-wend property which pushes the messages to the bottom
    const maxMsgToScroll = maxMsgs || 5;

    return (
        <div 
            ref={messagesContainerRef}
            className={`bg-white text-regal-blue p-10 rounded-3xl shadow-lg mb-8 overflow-y-auto h-[80vh] flex flex-col space-y-4 ${
                messages.length < maxMsgToScroll && "justify-end"
            }`}>
                {messages && messages.map((message, index) => (
                    <MessageItem key={index} message={message} pngFile={pngFile} />
                ))}
        </div>
    )
}

export default ResultsWithSources;