import React, { useState } from "react";
import CourseCart from "./CourseCart";
import { CourseListData } from "@/constants/CourseListData";
import Dropdown from "../common/Dropdown";
import SearchBox from "../common/SearchBox";
export const CourseListGroup = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectCourse, setSelectCourse] = useState("");
  const [searchData, setSearchData] = useState("");

  const equipmentData = CourseListData?.map((item) => ({
    value: item.subTitle,
    label: item.subTitle,
  }));
  const selectedCourseData = CourseListData?.map((item) => ({
    value: item.title,
    label: item.title,
  }));

  return (
    <div className="max-w-6xl mx-auto pb-10 px-2">
      <div className="flex items-center justify-center gap-10 md:flex-row flex-col-reverse">
        <div className="flex gap-10  ">
          <Dropdown
            options={equipmentData}
            selectedValue={selectedValue}
            onChange={setSelectedValue}
            placeholder="ציוד"
          />
          <Dropdown
            options={selectedCourseData}
            selectedValue={selectCourse}
            onChange={setSelectCourse}
            placeholder="איזור בגוף"
          />
        </div>
        <SearchBox
          value={searchData}
          onChange={setSearchData}
          placeholder="חיפוש תרגיל"
          containerClass="w-56"
          inputClass="w-56"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {CourseListData?.map((item) => (
          <CourseCart
            _id={item._id}
            title={item.title}
            cartBg={item.cartBg}
            whiteLogo={item.whiteLogo}
            icon={item.icon}
            subTitle={item.subTitle}
          />
        ))}
      </div>
    </div>
  );
};
