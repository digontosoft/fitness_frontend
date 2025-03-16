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
					className={`${currentPage === number ? 'bg-customBg' : ''}`}
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


export const CourseListGroup = () => {
  const [exercises, setExercises] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`${base_url}/exercise?search=${searchValue}&page=${page}`);
        setExercises(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setPage(response.data.pagination.currentPage);
        //console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercise();
  }, [searchValue,page,totalPages]);

//console.log("page",page,totalPages);


  return (
    <div className="max-w-6xl mx-auto pb-10 px-2">
      <div className="flex items-center justify-center gap-10 md:flex-row flex-col-reverse">
        <input
          type="text"
          placeholder="חפש"
          className="w-56 rounded-lg h-12 border-2 p-2"
          dir="rtl"
          onChange={(e)=>setSearchValue(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {exercises.map((exercise) => (
          <CourseCart
            key={exercise._id}
            _id={exercise._id}
            exercise={exercise}
          />
        ))}
      </div>
       {totalPages > 1 && <PaginationComp currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </div>
  );
};
