import VideoCart from "@/components/common/VideoCart";
import InputForm from "@/components/measurements/InputForm";
import Title from "@/components/measurements/Tilte";

import React from "react";
import { useParams } from "react-router-dom";

const Measurements = () => {
  const { id } = useParams();
  return (
    <div>
      <VideoCart
        sourceLink={
          "https://www.youtube.com/embed/iKJWC6dDjKQ?si=7a-XGnGoitNcdyJg"
        }
      />
      <Title tilte={"הזנת מדדים"} />
      <InputForm userId={id} />
    </div>
  );
};

export default Measurements;
