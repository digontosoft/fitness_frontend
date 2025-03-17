import VideoCart from "@/components/common/VideoCart";
import InputForm from "@/components/measurements/InputForm";
import Title from "@/components/measurements/Tilte";
import HeroVideo from "@/components/startTraining/HeroVideo";

import React from "react";
import { useParams } from "react-router-dom";

const Measurements = () => {
  const { id } = useParams();

  return (
    <div>
      <HeroVideo videoUrl={"https://www.youtube.com/watch?v=uUo9Bw5ytrI"} />
      {/* <HeroVideo
        videoUrl={
          userInfo?.gender === "male"
            ? "https://youtu.be/iKJWC6dDjKQ?feature=shared"
            : "https://www.youtube.com/watch?v=uUo9Bw5ytrI"
        }
      /> */}
      <Title tilte={"הזנת מדדים"} />
      <InputForm userId={id} />
    </div>
  );
};

export default Measurements;
