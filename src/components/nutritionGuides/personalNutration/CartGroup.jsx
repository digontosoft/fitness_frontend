import { useEffect, useState } from "react";
import { cartFour } from "@/assets";
import { base_url } from "@/api/baseUrl.js";
import axios from "axios";
import SingleCart from "@/components/nutritionGuides/SingleCart.jsx";
import Title from "@/components/measurements/Tilte.jsx";
import Loading from "@/components/common/Loading";

const CartGroup = () => {
  const [nutrationData, setNutrationData] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = localStorage.getItem("userInfo");
  const data = JSON.parse(auth);
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${base_url}/nutritionGuide/user/${data._id}`
        );
        setNutrationData(response?.data?.data);
      } catch (error) {
        console.log("personal nutrition menu error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [data._id]);
  console.log("nutrationData", nutrationData);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      dir="rtl"
      className="sm:py-10 max-w-6xl mx-auto justify-items-center items-center grid grid-cols-1 md:grid-cols-2 gap-10"
    >
      {nutrationData?.map((item) => (
        <SingleCart
          key={item._id}
          id={item._id}
          icon={cartFour}
          title={item.title}
          description={item.description}
          pdfLink={item.pdf_link}
        />
      ))}
    </div>
  );
};

export default CartGroup;
