import React from "react";
import Title from "../measurements/Tilte";
import RecipeParagraph from "../recipe/RecipeParagraph";
import VideoCourseCart from "../common/VideoCourseCart";
import { VideoCartData } from "@/constants/VideoCartData";
import Progressbar from "./Progressbar";
import Subtitle from "./Subtitle";
import { Button } from "../ui/button";
const ActionCourseCart = () => {
  const handleCourse = () => {
    console.log("course button clicked");
  };
  return (
    <div className=" bg-gradient-to-t from-[rgb(148,0,25)] to-[#FD4753] min-h-screen border-b-8 border-white py-12  ">
      <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10">
        <Title tilte={"אימון חיטוב רגליים ויד קדמית"} />
        <RecipeParagraph />
        <Subtitle />
        <Button className="text-sm font-bold text-white  bg-gradient-to-tr from-[rgb(148,0,25)] to-[#FD4753] px-8 py-4 rounded-full mt-10 w-52 md:w-40 h-12">
          התחלת אימון
        </Button>
        <p
          dir="rtl"
          className="text-[#0A2533] font-bold text-xl py-10 text center"
        >
          תרגילים:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
          {VideoCartData?.map((item) => (
            <VideoCourseCart
              key={item._id}
              title={item.title}
              videoUrl={item.VideoSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionCourseCart;
