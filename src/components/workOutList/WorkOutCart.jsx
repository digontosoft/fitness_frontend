import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { workOutData } from "@/constants/WorkOutListData";
import Cart from "./Cart";
import Dropdown from "../common/Dropdown";
import SearchBox from "../common/SearchBox";
const WorkOutCart = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
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
  return (
    <div className="max-w-6xl mx-auto px-2 pb-10">
      <div className="flex justify-center gap-10 md:gap-14 items-center py-10 md:flex-row-reverse flex-col ">
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
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-6">
        {filterData.map((item) => (
          <Cart
            key={item._id}
            title={item.title}
            caloriesTitle={item.caloriesTitle}
            timeTitle={item.timeTilte}
            timeIcon={item.timeIcon}
            cartBg={item.cartBg}
            calories={item.calories}
            whiteLogo={item.whiteLogo}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkOutCart;
