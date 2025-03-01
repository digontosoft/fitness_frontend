import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import React from "react";
import { RecipeBookBg } from "@/assets";
import Title from "@/components/measurements/Tilte";
import RecipeParagraph from "@/components/recipe/RecipeParagraph";
import RecipeCart from "@/components/recipe/RecipeCart";
const RecipeBook = () => {
  return (
    <div>
      <WorkOutListBaground bgImg={RecipeBookBg} />
      <Title tilte={"ספר המתכונים"} />
      <RecipeParagraph />
      <RecipeCart />
    </div>
  );
};

export default RecipeBook;
