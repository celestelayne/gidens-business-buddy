import React, { useRef, useEffect, useState } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const MessageItem = ({ message, pngFile }) => {

    const userImage = `/assets/images/green-square.png`;
    const botImage = `/assets/images/gidens-g-logo.svg`;

    const isHuman = message.type === 'user';
    const messageAlignment = isHuman ? 'flex-end' : 'flex-start';

    const gidensBlue = '#51C0E2';

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

            {/* <span
                className={message.type === "user" ? "user" : "bot"}
                style={{ maxWidth: "90%" }}
            >
                {message.text}
            </span> */}
            {/* {message.sourceDocuments && (
                <div className="mb-6">
                    <button
                        className="text-gray-600 text-sm font-bold"
                        onClick={() => setShowSources(!showSources)}
                    >
                        Source Documents {showSources ? "(Hide)" : "(Show)"}
                    </button>
                    {showSources && message.sourceDocuments.map((document, docIndex) => (
                        <div key={docIndex}>
                            <h3 className="text-gray-600 text-sm font-bold">
                                Source {docIndex + 1}:
                            </h3>
                            <p className="text-gray-800 text-sm mt-2">
                                {document.pageContent}
                            </p>
                            <pre className="text-xs text-gray-500 mt-2">
                                {JSON.stringify(document.metadata, null, 2)}
                            </pre>
                        </div>
                    ))}
                </div>
            )} */}
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