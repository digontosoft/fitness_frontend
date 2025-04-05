import { personalNutrationBg } from "@/assets";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import CartGroup from "@/components/nutritionGuides/personalNutration/CartGroup";
import Title from "@/components/measurements/Tilte";

const PersonalNutrationMenu = () => {
  return (
    <div>
      <WorkOutListBaground bgImg={personalNutrationBg} />
      <Title title={"תפריט תזונה אישי"} />
      <CartGroup />
    </div>
  );
};

export default PersonalNutrationMenu;
