// import React, { useEffect, useState } from "react";
// import CourseCart from "./CourseCart";
// import { CourseListData } from "@/constants/CourseListData";
// import Dropdown from "../common/Dropdown";
// import SearchBox from "../common/SearchBox";
// import Select from "react-dropdown-select";
// import axios from "axios";
// import { base_url } from "@/api/baseUrl";
// export const CourseListGroup = () => {
//   const [selectedValue, setSelectedValue] = useState("");
//   const [selectCourse, setSelectCourse] = useState("");
//   const [searchData, setSearchData] = useState("");
//   const [exercises, setExercises] = useState([]);
//   const [selectedExercise, setSelectedExercise] = useState(null);

//   useEffect(() => {
//     const fetchExercise = async () => {
//       try {
//         const response = await axios.get(`${base_url}/exercise`);
//         setExercises(response.data.data);
//       } catch (error) {
//         console.error("Error fetching exercises:", error);
//       }
//     };
//     fetchExercise();
//   }, []);

//   const equipmentData = CourseListData?.map((item) => ({
//     value: item.subTitle,
//     label: item.subTitle,
//   }));
//   const selectedCourseData = CourseListData?.map((item) => ({
//     value: item.title,
//     label: item.title,
//   }));

//   return (
//     <div className="max-w-6xl mx-auto pb-10 px-2">
//       <div className="flex items-center justify-center gap-10 md:flex-row flex-col-reverse">
//         <Select
//           className="rounded-lg h-12 min-w-[450px]"
//           direction="rtl"
//           options={exercises}
//           valueField="_id"
//           labelField="name"
//           searchBy="name"
//           onChange={(values) => setSelectedExercise(values)}
//         />
//         <div className="flex gap-10  ">
//           {/* <Dropdown
//             options={equipmentData}
//             selectedValue={selectedValue}
//             onChange={setSelectedValue}
//             placeholder="ציוד"
//           /> */}
//           {/* <Dropdown
//             options={selectedCourseData}
//             selectedValue={selectCourse}
//             onChange={setSelectCourse}
//             placeholder="איזור בגוף"
//           /> */}
//         </div>
//         {/* <SearchBox
//           value={searchData}
//           onChange={setSearchData}
//           placeholder="חיפוש תרגיל"
//           containerClass="w-56"
//           inputClass="w-56"
//         /> */}
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {selectedExercise &&
//           exercises?.map((exercise) => (
//             <CourseCart
//               key={exercise?._id}
//               _id={exercise._id}
//               exercise={exercise}
//               // title={item.title}
//               // cartBg={item.cartBg}
//               // whiteLogo={item.whiteLogo}
//               // icon={item.icon}
//               // subTitle={item.subTitle}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import CourseCart from "./CourseCart";
import axios from "axios";
import Select from "react-dropdown-select";
import { base_url } from "@/api/baseUrl";

export const CourseListGroup = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState([]);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`${base_url}/exercise`);
        setExercises(response.data.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercise();
  }, []);

  const filteredExercises =
    selectedExercise.length > 0
      ? exercises.filter((exercise) =>
          selectedExercise.some((selected) => selected._id === exercise._id)
        )
      : exercises;

  return (
    <div className="max-w-6xl mx-auto pb-10 px-2">
      <div className="flex items-center justify-center gap-10 md:flex-row flex-col-reverse">
        <Select
          className="rounded-lg h-12 min-w-[450px]"
          direction="rtl"
          options={exercises}
          valueField="_id"
          labelField="name"
          searchBy="name"
          multi
          onChange={(values) => setSelectedExercise(values)}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredExercises.map((exercise) => (
          <CourseCart
            key={exercise._id}
            _id={exercise._id}
            exercise={exercise}
          />
        ))}
      </div>
    </div>
  );
};
