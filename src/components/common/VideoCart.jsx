import React from "react";

const VideoCart = ({ sourceLink }) => {
  return (
    <div className="w-full text-center my-6 px-10">
      <div className="relative pb-[56.25%] h-0 ">
        <iframe
          className="absolute top-0 left-0 w-[100%]  h-[100%] md:h-[100%] rounded-2xl"
          src={sourceLink}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoCart;
