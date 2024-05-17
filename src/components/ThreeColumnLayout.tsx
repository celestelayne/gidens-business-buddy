import React from "react";

const ThreeColumnLayout = ({ leftChildren, middleChildren, rightChildren }) => (
  <div className="flex flex-col justify-between md:flex-row md:justify-between w-full min-h-screen">
    {/* Chat History */}
    <div className="md:w-2/5 w-full bg-orange-400 pt-16">{leftChildren}</div>
    {/* Chat */}
    <div className="flex flex-col justify-center md:w-2/5 w-full min-h-screen bg-orange-500 pt-16">{middleChildren}</div>
    {/* User Profile */}
    <div className="md:w-2/5 w-full bg-orange-700 pt-16">{rightChildren}</div>
  </div>
);

export default ThreeColumnLayout;