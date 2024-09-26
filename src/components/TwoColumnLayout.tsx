import React from "react";

const TwoColumnLayout = ({ leftChildren, rightChildren }) => (
  <div className="flex flex-col justify-between md:flex-row md:justify-between w-full">
  
    {/* Chat History */}
    <div className="flex flex-col w-1/6 p-2 text-white">{leftChildren}</div>
    
    {/* Chat */}
    <div className="flex-1 w-full p-2 text-regal-blue">{rightChildren}</div>
  </div>
);

export default TwoColumnLayout;