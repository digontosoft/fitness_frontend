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
      onClick={() => onclick(task)}
      tilte={task?.task_name}
      tilte1={task?.task_description}
      image={bodyBuilder3}
    />
  );
};

export default ArrowGroup;
