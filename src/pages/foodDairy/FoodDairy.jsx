import { foodDairy } from "@/assets";
import FoodDairyForm from "@/components/foodDairy/FoodDairyForm";
import Title from "@/components/measurements/Tilte";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import { useEffect } from "react";

const FoodDairy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen">
      <WorkOutListBaground bgImg={foodDairy} />
      <Title title={"יומן אכילה"} />
      <div className="max-w-6xl mx-auto sm:-mt-0 -mt-8">
        <FoodDairyForm />
      </div>
    </div>
  );
};

export default FoodDairy;
