import { base_url } from "@/api/baseUrl";
import ParsonalPdf from "@/components/nutritionGuides/personalNutration/ParsonalPdf";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NutritionDetails = () => {
  const { id } = useParams();
  const [nutrition, setNutrition] = useState(null);

  useEffect(() => {
    axios.get(`${base_url}/nutritionGuide/${id}`).then((response) => {
      if (response.status === 200) {
        setNutrition(response.data.data);
      }
    });
  }, [id]);
  console.log('nutrition menu:', nutrition);
  return (
    <div className="bg-[#7994CB] relative flex items-center justify-center min-h-screen mb-2">
      <div className="bg-white shadow-lg rounded-[60px] p-6 w-5/6 min-h-[80vh] h-auto flex flex-col items-center justify-center my-4">
        <div className="grid gap-4 items-center justify-items-center w-full">
          <ParsonalPdf data={nutrition} />
        </div>
      </div>
    </div>
  );
};

export default NutritionDetails;
