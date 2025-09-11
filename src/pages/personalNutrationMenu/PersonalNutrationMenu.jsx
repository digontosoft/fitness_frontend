import Title from "@/components/measurements/Tilte";
import CartGroup from "@/components/nutritionGuides/personalNutration/CartGroup";

const PersonalNutrationMenu = () => {
  return (
    <div className="min-h-[78vh] h-auto">
      {/* <WorkOutListBaground bgImg={personalNutrationBg} /> */}
      <Title title={"תפריט תזונה אישי"} />
      <CartGroup />
    </div>
  );
};

export default PersonalNutrationMenu;
