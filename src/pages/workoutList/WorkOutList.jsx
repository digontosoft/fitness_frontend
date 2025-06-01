import CartTitle from "@/components/workOutList/CartTitle";
import WorkOutCart from "@/components/workOutList/WorkOutCart";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import { workoutBg } from "@/assets";

const WorkOutList = () => {
  return (
    <div>
      {/* <WorkOutListBaground bgImg={workoutBg} /> */}
      <CartTitle title={"אימונים"} />
      <WorkOutCart />
    </div>
  );
};

export default WorkOutList;
