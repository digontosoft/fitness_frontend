import { foodDairy } from "@/assets";
import FoodDairyForm from "@/components/foodDairy/FoodDairyForm";
import Title from "@/components/measurements/Tilte";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import React from "react";

const FoodDairy = () => {
  return (
    <div className="min-h-screen">
      <WorkOutListBaground bgImg={foodDairy} />
      <Title title={"יומן אכילה"} />
      <div className="max-w-6xl mx-auto">
        <FoodDairyForm />
      </div>
    </div>
  );
};

export default FoodDairy;
