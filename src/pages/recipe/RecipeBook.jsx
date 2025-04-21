import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import { RecipeBookBg } from "@/assets";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import ParsonalPdf from "@/components/nutritionGuides/personalNutration/ParsonalPdf";
const RecipeBook = () => {
  const [recipeBook, setRecipeBook] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    const fetchRecipeBook = async () => {
      try {
        await axios.get(`${base_url}/recipeBook`).then((response) => {
          if (response.status === 200) {
            setRecipeBook(response.data.data);
            console.log("pdf:", response?.data?.data);
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
      {user?.userType === "recipe"
        ? recipeBook
            .filter((item) => item.type === "trainer")
            .map((recipe) => (
              <div
                key={recipe?._id}
                className="flex flex-col items-center justify-center w-full"
              >
                <ParsonalPdf data={recipe} />
              </div>
            ))
        : recipeBook
            .filter((item) => item.type === "normalUser")
            .map((recipe) => (
              <div
                key={recipe?._id}
                className="flex flex-col items-center justify-center max-w-5xl mx-auto"
              >
                <ParsonalPdf data={recipe} />
              </div>
            ))}
    </div>
  );
};

export default RecipeBook;
