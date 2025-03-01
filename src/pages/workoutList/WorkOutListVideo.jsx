import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import React, { useState } from "react";
import { workoutBg } from "@/assets";
import CartTitle from "@/components/workOutList/CartTitle";

import WorkOutCart from "@/components/workOutList/WorkOutCart";
import VideoCartBlur from "@/components/workOutList/VideoCartBlur";
const WorkOutListVideo = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoPlay = () => setIsVideoPlaying(true);
  const handleVideoPause = () => setIsVideoPlaying(false);
  return (
    <div>
      <WorkOutListBaground bgImg={workoutBg} />
      <CartTitle title={"אימונים"} />
      <VideoCartBlur
        sourceLink={
          "https://www.youtube.com/embed/iKJWC6dDjKQ?si=7a-XGnGoitNcdyJg"
        }
        onVideoPlay={handleVideoPlay}
        onVideoPause={handleVideoPause}
      />

      <div
        className={`transition-all duration-200 ${
          !isVideoPlaying ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <WorkOutCart />
      </div>
    </div>
  );
};

export default WorkOutListVideo;
