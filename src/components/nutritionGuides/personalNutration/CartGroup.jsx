import React from "react";
import PersonalNutrationCart from "./PersonalNutrationCart.jsx";
import { cartFour } from "@/assets";
const personalNutrationData = [
  {
    _id: 1,
    image: cartFour,
    title: "תפריט תזונה אישי 1",
    subTitle: "לצפייה במדריך",
  },
  {
    _id: 2,
    image: cartFour,
    title: "תפריט תזונה אישי 2",
    subTitle: "לצפייה במדריך",
  },
];
const CartGroup = () => {
  return (
    <div
      dir="rtl"
      className="py-10 max-w-6xl mx-auto justify-items-center items-center grid grid-cols-1 md:grid-cols-2 gap-10"
    >
      {personalNutrationData?.map((item) => (
        <PersonalNutrationCart
          key={item._id}
          _id={item._id}
          image={item.image}
          courseTitle={item.title}
          courseParagraph={item.subTitle}
        />
      ))}
    </div>
  );
};

export default CartGroup;
