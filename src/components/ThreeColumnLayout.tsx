import React from "react";

const ThreeColumnLayout = ({ leftChildren, middleChildren, rightChildren }) => (
  <div className="flex flex-col justify-between md:flex-row md:justify-between w-full min-h-screen">
    {/* Side Navigation */}
    <div className="md:w-300 w-full p-16">{leftChildren}</div>
    
    {/* Chat History */}
    <div className="flex flex-col md:w-300 w-full min-h-screen p-16">{middleChildren}</div>
    
    {/* Chat */}
    <div className="flex-1 w-full p-16">{rightChildren}</div>
  </div>
);

export default ThreeColumnLayout;