import React from "react";
import ReactPlayer from "react-player";

const CourseCart = ({ title, courseVideo }) => {
  return (
    <div className="w-full px-4">
      <h1 className="text-center py-6 text-2xl font-bold">{title}</h1>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-3/4 lg:w-2/3">
          <ReactPlayer
            url={courseVideo}
            width="100%"
            height="400px"
            controls
            className="rounded-xl border border-gray-200 shadow-lg overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
