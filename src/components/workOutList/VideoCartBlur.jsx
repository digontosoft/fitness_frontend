import React from "react";
import ReactPlayer from "react-player";

const VideoCartBlur = ({ sourceLink, onVideoPlay, onVideoPause }) => {
  return (
    <div className="w-full text-center my-6 px-10">
      <div className="relative pb-[56.25%] h-0 md:rounded-3xl rounded-2xl overflow-hidden">
        <ReactPlayer
          url={sourceLink}
          playing={false}
          controls
          width="100%"
          height="100%"
          className="absolute top-0 left-0 w-full h-full"
          onPlay={onVideoPlay}
          onPause={onVideoPause}
        />
      </div>
    </div>
  );
};

export default VideoCartBlur;
