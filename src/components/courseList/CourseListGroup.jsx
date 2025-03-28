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
import { Button } from "@/components/ui/button";
import { set } from "react-hook-form";
import ExerciseDetails from "@/components/admin/components/ExerciseTable/ExerciseDetails";
import CourseDetails from "./course/CourseDetails";

const PaginationComp = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  console.log(currentPage, totalPages);

  // Create an array of page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center gap-4 my-4">
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {pageNumbers.map((number) => (
        <Button
          size="sm"
          key={number}
          onClick={() => onPageChange(number)}
          className={`${currentPage === number ? "bg-customBg" : ""}`}
        >
          {number}
        </Button>
      ))}

      <Button
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

//export default PaginationComp;

const bodyPartOptions = [
  { label: "כל חלקי הגוף", value: "" },
  {
    label: "יד קדמית",
    value: "יד קדמית",
  },
  {
    label: "יד אחורית ",
    value: "יד אחורית",
  },
  { label: "כתפיים", value: "כתפיים" },
  { label: "חזה", value: "חזה" },
  { label: "גב", value: "גב" },
  { label: "רגליים", value: "רגליים" },
  { label: "בטן", value: "בטן" },
  { label: "ישבן", value: "ישבן" },
  { label: "גב תחתון", value: "גב תחתון" },
];

const equipmentOptions = [
  { label: "כל הציוד", value: "" },
  { label: "ללא ציוד", value: "ללא ציוד" },
  { label: "TRX", value: "TRX" },
  { label: "גומיות", value: "גומיות" },
  { label: "משקולות", value: "משקולות" },
  { label: "מכונות", value: "מכונות" },
  { label: "מוטות", value: "מוטות" },
];

export const CourseListGroup = () => {
  const [exercises, setExercises] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [body_part, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");

  console.log(body_part, equipment);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(
          `${base_url}/exercise?search=${searchValue}&page=${page}&body_part=${body_part}&equipment=${equipment}`
        );
        setExercises(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setPage(response.data.pagination.currentPage);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercise();
  }, [searchValue, page, totalPages, body_part, equipment]);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  //console.log("page",page,totalPages);

  const handleOpen = (id) => {
    console.log("id", id);
    setId(id);
    setOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto pb-10 px-2">
      <div className="flex items-center justify-center gap-10 md:flex-row flex-col-reverse">
        <input
          type="text"
          placeholder="חפש"
          className="w-40 rounded-sm border-blue-500 h-12 border-2 p-2 focus:border-blue-400"
          dir="rtl"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Select
          direction="rtl"
          className="w-40 rounded-lg h-12 border-2 p-2"
          placeholder="חיפוש חלק בגוף"
          options={bodyPartOptions}
          onChange={(e) => setBodyPart(e[0].value)}
        />
        <Select
          direction="rtl"
          options={equipmentOptions}
          className="w-40 rounded-lg h-12 border-2 p-2"
          placeholder="ציוד חיפוש"
          onChange={(e) => setEquipment(e[0].value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-center justify-items-center gap-6">
        {exercises.map((exercise) => (
          <CourseCart
            key={exercise._id}
            _id={exercise._id}
            exercise={exercise}
            handleOpen={() => handleOpen(exercise._id)}
          />
        ))}
      </div>
      {open && <CourseDetails open={open} setOpen={setOpen} exerciseId={id} />}
      {totalPages > 1 && (
        <PaginationComp
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};
