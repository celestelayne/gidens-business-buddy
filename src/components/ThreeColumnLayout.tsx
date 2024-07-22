import React from "react";

const ThreeColumnLayout = ({ leftChildren, middleChildren, rightChildren }) => (
  <div className="flex flex-col justify-between md:flex-row md:justify-between w-full min-h-screen">
    {/* Side Navigation */}
    <div className="md:w-300 w-full mt-16 p-2 text-white">{leftChildren}</div>
    
    {/* Chat History */}
    <div className="flex flex-col md:w-300 w-full min-h-screen mt-16 p-2 text-white">{middleChildren}</div>
    
    {/* Chat */}
    <div className="flex-1 w-full mt-16 p-2 text-black">{rightChildren}</div>
  </div>
);

export default ThreeColumnLayout;