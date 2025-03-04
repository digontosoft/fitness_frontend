import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import { RecipeBookBg } from "@/assets";
import Title from "@/components/measurements/Tilte";
import RecipeParagraph from "@/components/recipe/RecipeParagraph";
import RecipeCart from "@/components/recipe/RecipeCart";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
const RecipeBook = () => {
  const [recipeBook, setRecipeBook] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    const fetchRecipeBook = async () => {
      try {
        await axios.get(`${base_url}/recipeBook`).then((response) => {
          if (response.status === 200) {
            setRecipeBook(response.data.data);
          }
        });
      } catch (error) {
        console.error("Error fetching recipe book:", error);
      }
    };
    fetchRecipeBook();
  }, []);
  return (
    <div>
      <WorkOutListBaground bgImg={RecipeBookBg} />
      {/* <Title tilte={"ספר המתכונים"} />
      <RecipeParagraph /> */}
      {user?.userType === "trainer"
        ? recipeBook
            .filter((item) => item.type === "normalUser")
            .map((recipe) => (
              <div
                key={recipe?._id}
                className="flex flex-col items-center justify-center"
              >
                <Title tilte={recipe?.title} />
                <p>{recipe?.description}</p>
                <RecipeCart recipe={recipe} />
              </div>
            ))
        : recipeBook
            .filter((item) => item.type === "trainer")
            .map((recipe) => (
              <div
                key={recipe?._id}
                className="flex flex-col items-center justify-center"
              >
                <Title tilte={recipe?.title} />
                <p>{recipe?.description}</p>
                <RecipeCart recipe={recipe} />
              </div>
            ))}
    </div>
  );
};

export default RecipeBook;
