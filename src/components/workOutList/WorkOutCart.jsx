import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { workOutData } from "@/constants/WorkOutListData";
import Cart from "./Cart";
import Dropdown from "../common/Dropdown";
import SearchBox from "../common/SearchBox";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import Select from "react-dropdown-select";
const WorkOutCart = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const filterData = workOutData.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTraining = selectedItem ? item.title === selectedItem : true;
    return matchesSearch && matchesTraining;
  });

  const dropdownOptions = workOutData?.map((item) => ({
    value: item.title,
    label: item.title,
  }));

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`${base_url}/training`);
        setTrainings(response.data.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercise();
  }, []);
  console.log("selectedTraining:", selectedTraining);
  return (
    <div className="max-w-6xl mx-auto px-2 pb-10">
      <div className="flex items-center justify-center mt-5">
        <div className="w-[350px]">
          <Select
            className="rounded-lg h-12"
            direction="rtl"
            options={trainings}
            valueField="_id"
            labelField="name"
            onChange={(values) => setSelectedTraining(values)}
          />
        </div>
      </div>
      {/* <div className="flex justify-center gap-10 md:gap-14 items-center py-10 md:flex-row-reverse flex-col ">
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="חיפוש מדריך"
          containerClass="w-56"
          inputClass="w-56"
        />
        <div>
          <Dropdown
            options={dropdownOptions}
            selectedValue={selectedItem}
            onChange={setSelectedItem}
            placeholder="בחר אימון מהרשימה"
          />
        </div>
      </div> */}
      {selectedTraining ? (
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-6">
          {selectedTraining.map(
            (training) =>
              training.workouts.map((workout) => (
                <Cart key={workout._id} workout={workout} training={training} />
              ))
            //  (
            //   <Cart
            //     key={item._id}
            //     title={item.title}
            //     caloriesTitle={item.caloriesTitle}
            //     timeTitle={item.timeTilte}
            //     timeIcon={item.timeIcon}
            //     cartBg={item.cartBg}
            //     calories={item.calories}
            //     whiteLogo={item.whiteLogo}
            //   />
            // )
          )}
        </div>
      ) : (
        <p className="text-center my-5">Please select a training</p>
      )}
    </div>
  );
};

export default WorkOutCart;
