import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const MessageItem = ({ message, pngFile }) => {

    const [showSources, setShowSources] = useState(false);

    const userImage = `/assets/images/green-square.png`;
    const botImage = `/assets/images/${pngFile}.png`;

    return(
        <>
            <Image
                src={message.type === "user" ? userImage : botImage}
                alt={`${message.type}'s profile image`}
                width={32}
                height={32}
                className="rounded"
            />
            <span
                className={message.type === "user" ? "user" : "bot"}
                style={{ maxWidth: "90%" }}
            >
                {message.text}
            </span>
            {message.sourceDocuments && (
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
            )}
        </>
    )
}

const ResultsWithSources = ({ messages, pngFile, maxMsgs }) => {

    const messagesContainerRef = useRef();
    console.log(messagesContainerRef)

    useEffect(() => {
        if (messagesContainerRef.current) {
            const element = messagesContainerRef.current;
            console.log(element)
        //   element.scrollTop = element.scrollHeight;
        }
    }, [messages]);

    // before reaching the max number of messages, add justify-wend property which pushes the messages to the bottom
    const maxMsgToScroll = maxMsgs || 5;

    return (
        <div 
            ref={messagesContainerRef}
            className={`bg-white text-regal-blue p-10 rounded-3xl shadow-lg mb-8 overflow-y-auto h-[500px] max-h-[500px] flex flex-col space-y-4 ${
                messages.length < maxMsgToScroll && "justify-end"
            }`}>
                {messages && messages.map((message, index) => (
                    <MessageItem key={index} message={message} pngFile={pngFile} />
                ))}
        </div>
    )
}

export default ResultsWithSources;