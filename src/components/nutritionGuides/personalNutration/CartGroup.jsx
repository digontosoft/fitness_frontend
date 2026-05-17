import { base_url } from "@/api/baseUrl.js";
import personalNutrationBg from "@/assets/image/personal-nutrition-menu.svg";
import Loading from "@/components/common/Loading";
import SingleCart from "@/components/nutritionGuides/SingleCart.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

const CartGroup = () => {
  const [nutrationData, setNutrationData] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = localStorage.getItem("userInfo");
  const data = JSON.parse(auth);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      dir="rtl"
      className={`sm:py-10 max-w-6xl mx-auto justify-items-center items-center grid gap-5 mb-5 ${
        nutrationData?.length === 1
          ? "grid-cols-1"
          : "sm:grid-cols-3 grid-cols-2"
      }`}
    >
      {nutrationData?.map((item) => (
        <SingleCart
          key={item._id}
          id={item._id}
          icon={personalNutrationBg}
          title={item.title}
          description={item.description}
          pdfLink={item.pdf_link}
        />
      ))}
    </div>
  );
};

export default CartGroup;
