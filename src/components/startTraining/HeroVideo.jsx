import React from "react";
import ReactPlayer from "react-player";

const HeroVideo = ({ videoUrl }) => {
  return (
    <div className="w-full rounded-lg sm:mt-0 mt-10">
      <div className="w-full rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          // height="350px"
          controls
          className="h-[305px] sm:[400px]"
        />
      </div>
    </div>
  );
};

export default HeroVideo;
