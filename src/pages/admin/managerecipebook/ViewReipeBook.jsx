import { base_url } from "@/api/baseUrl";
import ParsonalPdf from "@/components/nutritionGuides/personalNutration/ParsonalPdf";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ViewRecipeBook = () => {
  const {id} = useParams();
  const [recipeBook, setRecipeBook] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    const fetchRecipeBook = async () => {
      try {
        await axios.get(`${base_url}/recipeBook/${id}`).then((response) => {
          if (response.status === 200) {
            setRecipeBook(response?.data?.data);
            console.log("recipe book:", response?.data?.data);
          }
        });
      } catch (error) {
        console.error("Error fetching recipe book:", error);
      }
    };
    fetchRecipeBook();
  }, [id]);

  return (
    <div>
      {/* {user?.userType === "recipe"
        ? recipeBook
            .filter((item) => item.type === "trainer")
            .map((recipe) => (
              <div
                key={recipe?._id}
                className="flex flex-col items-center justify-center w-full"
              >
                <ParsonalPdf data={recipe} isBaseUrl={true} />
              </div>
            ))
        : recipeBook
            .filter((item) => item.type === "normalUser")
            .map((recipe) => (
              <div
                key={recipe?._id}
                className="flex flex-col items-center justify-center max-w-5xl mx-auto"
              >
                <ParsonalPdf data={recipe} isBaseUrl={true} />
              </div>
            ))} */}
              <div
                
                className="flex flex-col items-center justify-center w-full"
              >
                <ParsonalPdf data={recipeBook} isBaseUrl={true} />
              </div>
    </div>
  );
};

export default ViewRecipeBook;
