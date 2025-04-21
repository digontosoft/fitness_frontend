import React from "react";
import ReactPlayer from "react-player";
import { twMerge } from "tailwind-merge";

const HeroVideo = ({ videoUrl, className }) => {
  return (
    <div className={twMerge("w-full rounded-lg sm:mt-0 mt-10", className)}>
      <div className="w-full sm:h-[500px] rounded-3xl border border-gray-200 shadow-sm">
        <ReactPlayer url={videoUrl} width="100%" height="100%" controls />
      </div>
    </div>
  );
};

export default HeroVideo;
