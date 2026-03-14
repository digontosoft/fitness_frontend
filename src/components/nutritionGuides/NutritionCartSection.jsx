import { NutritionCart } from "./NutritionCart";

const NutritionCartSection = () => {
  return (
    <div className="py-6 sm:py-8 md:py-10 px-2 sm:px-4">
      <p className="text-[#0A2533] font-bold text-xl sm:text-2xl text-center" dir="rtl">
        מדריכי תזונה
      </p>
      <NutritionCart />
    </div>
  );
};

export default NutritionCartSection;
