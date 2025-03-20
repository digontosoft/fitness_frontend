import SingleCart from "@/components/measurements/measurementWatch/SingleCart";
import Title from "@/components/measurements/measurementWatch/Title";
import React from "react";
import { useLocation, useParams } from "react-router-dom";

const MeasurementsWatch = () => {
  const location = useLocation();

  // Create a URLSearchParams object to extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  console.log("userId:", userId);

  return (
    <div>
      <Title title={"מעקב מדדים"} />
      <SingleCart userId={userId} />
    </div>
  );
};

export default MeasurementsWatch;
