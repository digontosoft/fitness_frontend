import { trainingandexercisebanner } from "@/assets/index";
import CartTitle from "@/components/workOutList/CartTitle";
import WorkOutCart from "@/components/workOutList/WorkOutCart";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";

const WorkOutList = () => {
  return (
    <div className="min-h-[75vh]">
      <WorkOutListBaground bgImg={trainingandexercisebanner} />
      <CartTitle title={"אימונים"} />
      <WorkOutCart />
    </div>
  );
};

export default WorkOutList;
