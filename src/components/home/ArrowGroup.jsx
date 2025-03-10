import React from "react";
import ArrowCard from "./ArrowCard";
import {
  measurementRope,
  ArrowBurger,
  ArrowDumbel,
  bodyBuilder3,
} from "@/assets";

const ArrowGroup = ({ task, onclick }) => {
  return (
    <ArrowCard
      onClick={onclick}
      tilte1={"שווה לצרף חברה"}
      tilte={task?.task_name}
      image={bodyBuilder3}
    />
  );
};

export default ArrowGroup;
