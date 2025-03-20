import React, { useEffect, useState } from "react";
import PersonalNutrationCart from "./PersonalNutrationCart.jsx";
import { cartFour } from "@/assets";
import { base_url } from "@/api/baseUrl.js";
import axios from "axios";
import SingleCart from "@/components/nutritionGuides/SingleCart.jsx";
const personalNutrationData = [
  {
    _id: 1,
    image: cartFour,
    title: "תפריט תזונה אישי 1",
    subTitle: "לצפייה במדריך",
  },
  {
    _id: 2,
    image: cartFour,
    title: "תפריט תזונה אישי 2",
    subTitle: "לצפייה במדריך",
  },
];
const CartGroup = () => {
    const [nutrationData, setNutrationData] = useState([]);
    const [loading, setLoading] = useState(false);

    const auth = localStorage.getItem("userInfo");
    const data = JSON.parse(auth);
    console.log(data);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
              setLoading(true)
                const response = await axios.get(`${base_url}/nutritionGuide/user/${data._id}`);
                setNutrationData(response?.data?.data);
            } catch (error) {
               
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[data._id])
    console.log("nutrationData", nutrationData);
    
  return (
    <div
      dir="rtl"
      className="py-10 max-w-6xl mx-auto justify-items-center items-center grid grid-cols-1 md:grid-cols-2 gap-10"
    >
      {nutrationData?.map((item) => (
        // <PersonalNutrationCart
        //   key={item._id}
        //   _id={item._id}
        //   image={item.image}
        //   courseTitle={item.title}
        //   courseParagraph={item.subTitle}
        // />
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
