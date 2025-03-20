import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { NutrationData } from "@/constants/NutrationData";
import SingleCart from "./SingleCart";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import Loading from "../common/Loading";
export const NutritionCart = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [nutrationData, setNutrationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = localStorage.getItem("userInfo");
  const parsedAuthData = JSON.parse(auth);
  console.log(parsedAuthData._id);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/nutritionGuide/for-user/${parsedAuthData?._id}`);
        const apiData = response?.data?.data;
        const mergedData = apiData.map((item, index) => ({
          ...item,
          icon: NutrationData[index % NutrationData.length]?.icon || "",
        }));
        setNutrationData(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Something went wrong, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [parsedAuthData?._id]);

  const filterData = nutrationData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filterData);
  return (
    <div className="my-20">
      <div className="flex justify-center">
        <div
          className="flex justify-between items-center py-10 relative w-56 "
          dir="rtl"
        >
          <input
            type="search"
            name=""
            id=""
            placeholder="חיפוש מדריך"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-gray-200 bg-white shadow-xl py-3 px-2 rounded-xl text-sm w-56 "
          />
          <div className="absolute bg-red-700 w-8 h-8 rounded-full flex justify-center items-center left-2">
            <GoSearch className="text-white" />
          </div>
        </div>
      </div>
      {loading && <Loading />}
      {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center items-center px-2">
        {filterData.length > 0 ? (
          filterData.map((item) => (
            <SingleCart
              key={item._id}
              id={item._id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              pdfLink={item.pdf_link}
            />
          ))
        ) : (
          <p className="text-center col-span-full">No results found.</p>
        )}
      </div>
    </div>
  );
};
