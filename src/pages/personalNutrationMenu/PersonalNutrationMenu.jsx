import React from "react";
import { personalNutrationBg } from "@/assets";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import CartGroup from "@/components/nutritionGuides/personalNutration/CartGroup";

const PersonalNutrationMenu = () => {
  return (
    <div>
      <WorkOutListBaground bgImg={personalNutrationBg} />
      <CartGroup />
    </div>
  );
};

export default PersonalNutrationMenu;
