import VideoCart from "@/components/common/VideoCart";
import InputForm from "@/components/measurements/InputForm";
import Title from "@/components/measurements/Tilte";

import React from "react";

const Measurements = () => {
  return (
    <div>
      <VideoCart
        sourceLink={
          "https://www.youtube.com/embed/iKJWC6dDjKQ?si=7a-XGnGoitNcdyJg"
        }
      />
      <Title tilte={"הזנת מדדים"} />
      <InputForm />
    </div>
  );
};

export default Measurements;
