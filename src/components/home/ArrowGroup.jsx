import React from "react";
import ArrowCard from "./ArrowCard";
import {
  measurementRope,
  ArrowBurger,
  ArrowDumbel,
  bodyBuilder3,
} from "@/assets";

const ArrowGroup = () => {
  return (
    <div className=" mx-w-6xl mx-auto flex items-center justify-between gap-10 md:pt-20 py-10 flex-col md:flex-row">
      <ArrowCard
        tilte1={"שווה לצרף חברה"}
        tilte={"לצפייה בסרטון"}
        image={bodyBuilder3}
      />
      <ArrowCard tilte={"מעקב מדדים"} image={measurementRope} />
      <ArrowCard
        tilte={"מילוי יומן אכילה"}
        tilte1={"הזנת נתונים של 3 ימים"}
        image={ArrowBurger}
      />
      <ArrowCard
        tilte={"החל אימון"}
        tilte1={"שם האימון יהיה כאן"}
        image={ArrowDumbel}
      />
    </div>
  );
};

export default ArrowGroup;
