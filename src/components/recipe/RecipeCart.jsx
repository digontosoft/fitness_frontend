import React from "react";
import { RecipeBookCart } from "@/assets";
const RecipeCart = () => {
  return (
    <div className="flex flex-col justify-center items-center pb-10  px-4">
      <img className="pb-10" src={RecipeBookCart} alt="" />

      <button className="underline text-[#000000] text-xs font-bold md:hidden block ">
        להורדת ספר המתכונים
      </button>
    </div>
  );
};

export default RecipeCart;
