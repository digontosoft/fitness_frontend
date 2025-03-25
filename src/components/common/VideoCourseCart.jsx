import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import ReactPlayer from "react-player";

const VideoCourseCart = ({ exercise }) => {
  console.log("exercise", exercise);
  
  return (
    <div className="w-full md:w-96 flex gap-2 items-center justify-between px-2 py-2 bg-[#FBFBFB] rounded-2xl shadow-md shadow-gray-300">
      <Button className="rounded-2xl">
        <FaArrowLeftLong />
      </Button>
      <div className="w-full flex  items-center justify-center">
        <h1 className="text-sm font-bold text-[#0A2533]">
          {" "}
          {exercise?.name}
        </h1>
      </div>
      <div className="w-full max-w-xs mx-auto">
        <ReactPlayer
          url={exercise?.video_url}
          width="100%"
          height="80px"
          controls
          className="rounded-lg border border-gray-200 shadow-sm"
        />
      </div>
    </div>
  );
};

export default VideoCourseCart;
