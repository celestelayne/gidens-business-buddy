import React, { ChangeEvent, KeyboardEvent } from "react";
import { sourceCodePro } from "../styles/fonts";
import { Icons } from "../components/Icons";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

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
                <OutlinedInput
                    sx={{ borderRadius: '2rem', width: '100%' }}
                    id="standard-adornment"
                    autoFocus
                    type="text"
                    value={prompt}
                    onChange={handlePromptChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeHolderText || "e.g. Ask me something..."}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton aria-label="send icon" onClick={handleSubmit}>
                            {/* <SendIcon /> */}
                        </IconButton>
                        </InputAdornment>
                    }
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