import { base_url } from "@/api/baseUrl";
import { NutrationData } from "@/constants/NutrationData";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import Loading from "../common/Loading";
import SingleCart from "./SingleCart";

export const NutritionCart = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [nutrationData, setNutrationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading) setLoading(true); // Ensure loading state on remount/redirect
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/nutritionGuide`);
        const apiData = response?.data?.data;
        const mergedData = Array.isArray(apiData)
          ? apiData.map((item, index) => ({
              ...item,
              icon: NutrationData[index % NutrationData.length]?.icon || "",
            }))
          : [];
        setNutrationData(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Something went wrong, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterData = nutrationData.filter(
    (item) => item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="my-10">
      <div className="flex justify-center">
        <div
          className="flex justify-between items-center relative w-56 "
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
            dir="rtl"
          />
          <div className="absolute bg-[#7994CB] w-8 h-8 rounded-full flex justify-center items-center left-2">
            <GoSearch className="text-white" />
          </div>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500 text-center mt-6">{error}</div>
      ) : (
        <div
          className={`max-w-6xl mx-auto grid  gap-6 justify-items-center items-center px-2 py-10 sm:py-0 md:py-5 ${
            filterData.length === 1
              ? "grid-cols-1"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {filterData.length > 0 ? (
            filterData.map((item) =>
              item && item._id ? (
                <SingleCart
                  key={item._id}
                  id={item._id}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  pdfLink={item.pdf_link}
                  type="guide"
                />
              ) : null
            )
          ) : (
            <p className="text-center col-span-full">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};
