import React from "react";
import ReactPlayer from "react-player";

const CourseCart = ({ video }) => {
  console.log("vdeo link", video.videoLink);
  return (
    <div className="w-full px-4">
      <h1 className="text-center py-6 text-2xl font-bold">
        {video?.videoTitle}
      </h1>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-3/4 lg:w-2/3  ">
          <iframe
            src={video?.videoLink}
            // src={
            //   "https://res.cloudinary.com/dt3qrt76n/video/upload/v1716032300/Videos/Course_Status_Programming_Hero_9_ivnnxe.mp4"
            // }
            width="100%"
            height="500px"
            allow="autoplay"
            className="aspect-video overflow-hidden object-cover"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
