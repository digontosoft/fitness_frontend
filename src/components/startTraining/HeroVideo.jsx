import React from "react";
import ReactPlayer from "react-player";

const HeroVideo = ({ videoUrl }) => {
  return (
    <div className="w-full rounded-lg">
      <div className="w-full rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="400px"
          controls
          className=""
        />
      </div>
    </div>
  );
};

export default HeroVideo;
