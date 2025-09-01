import { base_url } from "@/api/baseUrl";
import Loading from "@/components/common/Loading";
import ParsonalPdf from "@/components/nutritionGuides/personalNutration/ParsonalPdf";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ViewRecipeBook = () => {
  const {id} = useParams();
  const [recipeBook, setRecipeBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    const fetchRecipeBook = async () => {
      setLoading(true);
      try {
        await axios.get(`${base_url}/recipeBook/${id}`).then((response) => {
          if (response.status === 200) {
            setRecipeBook(response?.data?.data);
            setLoading(false);
            // console.log('recipeBook:',response?.data?.data);
          }
        });
      } catch (error) {
        console.error("Error fetching recipe book:", error);
      }
    };
    fetchRecipeBook();
  }, [id]);
  if(loading){
    return <Loading />
  }
  return (
    <div>
             <div
                
                className="flex flex-col items-center justify-center w-full"
              >
                <ParsonalPdf data={recipeBook}  />
              </div>
    </div>
  );
};

export default ViewRecipeBook;
