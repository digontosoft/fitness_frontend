import { base_url } from "@/api/baseUrl";
import { personalNutrationBg } from "@/assets";
import Loading from "@/components/common/Loading";
import ParsonalPdf from "@/components/nutritionGuides/personalNutration/ParsonalPdf";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PdfNutration = () => {
  const { id } = useParams();
  const [singleData, setSingleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/nutritionGuide/${id}`);
        setSingleData(response?.data?.data);
      } catch (error) {
        setError("error fatching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  return (
    <div className="w-full">
      <WorkOutListBaground bgImg={personalNutrationBg} />
      <div className="flex items-center justify-center">
        <ParsonalPdf data={singleData} />
      </div>
    </div>
  );
};

export default PdfNutration;
