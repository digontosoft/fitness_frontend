import CartTitle from "@/components/workOutList/CartTitle";
import WorkOutCart from "@/components/workOutList/WorkOutCart";

const WorkOutList = () => {
  return (
    <div className="min-h-[75vh]">
      <CartTitle title={"אימונים"} />
      <WorkOutCart />
    </div>
  );
};

export default WorkOutList;
