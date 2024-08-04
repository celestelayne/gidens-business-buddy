import React, { ChangeEvent, KeyboardEvent } from "react";
import { sourceCodePro } from "../styles/fonts";
import { Icons } from "../components/Icons";

interface PromptBox {
    prompt: string;
    handlePromptChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    placeHolderText?: string;
    error?: string;
    disableButton?: boolean;

}

const PromptBox = ({
    prompt,
    handlePromptChange,
    handleSubmit,
    placeHolderText,
    error,
    disableButton,
}: any) => {

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            /* 
                passed handle submit from the prompt box 
                if someone hits enter, it activates the handle submit function
            */
            handleSubmit();
        }
    };

    return(
        <>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={prompt}
                    onChange={handlePromptChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeHolderText || "e.g. Can you help me improve my LinkedIn summary?"}
                    className="w-full h-14 mr-4 py-2 px-4 bg-white text-regal-blue placeholder-gray-500 focus:border-sky-500 rounded-xl shadow"
                />

                {!disableButton && (
                    <button
                        onClick={handleSubmit} // if someone clicks the button, it also activates the handle submit function 
                        className={`py-2 px-2 ${sourceCodePro.className}`}
                    >
                        <Icons.send size={36} />
                    </button>
                )}
            </div>
            <p className={`text-red-500 ${error ? "block" : "hidden"}`}>{error}</p>
        </>
    )
}

export default PromptBox;