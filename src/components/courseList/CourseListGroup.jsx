import { base_url } from "@/api/baseUrl";
import PaginationComp from "@/components/pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { GoSearch } from "react-icons/go";
import Loading from "../common/Loading";
import CourseDetails from "./course/CourseDetails";
import CourseCart from "./CourseCart";

// const PaginationComp = ({ currentPage, totalPages, onPageChange }) => {
//   const pageNumbers = [];
//   console.log(currentPage, totalPages);

//   // Create an array of page numbers
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="flex justify-center gap-4 my-4">
//       <Button
//         size="sm"
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         Prev
//       </Button>

//       {pageNumbers.map((number) => (
//         <Button
//           size="sm"
//           key={number}
//           onClick={() => onPageChange(number)}
//           className={`${currentPage === number ? "bg-customBg" : ""}`}
//         >
//           {number}
//         </Button>
//       ))}

//       <Button
//         size="sm"
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </Button>
//     </div>
//   );
// };

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
  { label: "פולי", value: "פולי" },
];

// export const CourseListGroup = () => {
//   const [trainings, setTrainings] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [body_part, setBodyPart] = useState("");
//   const [equipment, setEquipment] = useState("");
//   const [loading, setLoading] = useState(false);
//   const user = JSON.parse(localStorage.getItem("userInfo"));

//   useEffect(() => {
//     const fetchExercise = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           // `${base_url}/exercise?search=${searchValue}&page=${page}&body_part=${body_part}&equipment=${equipment}`
//           `${base_url}/get-training-by-user-id/${user?._id}`
//         );
//         setTrainings(response.data.data);
//         setTotalPages(response.data.pagination.totalPages);
//         setPage(response.data.pagination.currentPage);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching exercises:", error);
//       }
//     };
//     fetchExercise();
//   }, [user?._id]);

//   const [open, setOpen] = useState(false);
//   const [id, setId] = useState("");

//   console.log("page", trainings);

//   const handleOpen = (id) => {
//     setId(id);
//     setOpen(true);
//   };

//   return (
//     <div className="max-w-6xl mx-auto pb-10 px-2">
//       <div className="flex items-center justify-center gap-10 md:flex-row flex-col-reverse">
//         <div
//           className="flex justify-between items-center relative min-w-[310px] h-12"
//           dir="rtl"
//         >
//           <input
//             type="search"
//             name=""
//             id=""
//             placeholder="סנן לפי שם"
//             onChange={(e) => setSearchValue(e.target.value)}
//             className="border-gray-200 bg-white shadow-xl py-3 px-2 rounded-xl text-sm min-w-[310px] h-12"
//           />
//           <div className="absolute bg-red-700 w-8 h-8 rounded-full flex justify-center items-center left-2">
//             <GoSearch className="text-white" />
//           </div>
//         </div>

//         <div className="flex sm:gap-16 gap-4 w-full items-center justify-center">
//           <Select
//             direction="rtl"
//             className="sm:min-w-[310px] rounded-lg h-12 border-2 p-2"
//             placeholder="סנן לפי חלק בגוף"
//             options={bodyPartOptions}
//             onChange={(e) => setBodyPart(e[0].value)}
//           />
//           <Select
//             direction="rtl"
//             options={equipmentOptions}
//             className="sm:min-w-[310px] rounded-lg h-12 border-2 p-2"
//             placeholder="סנן לפי ציוד"
//             onChange={(e) => setEquipment(e[0].value)}
//           />
//         </div>
//       </div>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="flex flex-wrap items-center justify-center gap-6">
//           {trainings?.flatMap((training) =>
//             training.workouts.flatMap((workout) =>
//               workout.exercises.map((exercise) => (
//                 <CourseCart
//                   key={exercise?.exercise_id?._id}
//                   _id={exercise?.exercise_id?._id}
//                   exerciseId={exercise?.exercise_id?._id}
//                   handleOpen={() => handleOpen(exercise?.exercise_id?._id)}
//                 />
//               ))
//             )
//           )}
//         </div>
//       )}

//       {open && <CourseDetails open={open} setOpen={setOpen} exerciseId={id} />}
//       {totalPages > 1 && (
//         <PaginationComp
//           currentPage={page}
//           totalPages={totalPages}
//           onPageChange={setPage}
//         />
//       )}
//     </div>
//   );
// };

export const CourseListGroup = () => {
  const [trainings, setTrainings] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [body_part, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchExercise = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/get-training-by-user-id/${user?._id}`
        );
        setTrainings(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setPage(response.data.pagination.currentPage);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [user?._id]);


  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };


  const getFilteredExercises = trainings.flatMap((training) =>
    training.workouts.flatMap((workout) =>
      workout.exercises.filter((exercise) => {
        const nameMatch = exercise.exercise_id?.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());

        const bodyPartMatch = body_part
          ? exercise.exercise_id?.body_part === body_part
          : true;

        const equipmentMatch = equipment
          ? exercise.exercise_id?.equipment === equipment
          : true;

        return nameMatch && bodyPartMatch && equipmentMatch;
      })
    )
  );

  return (
    <div className="max-w-6xl mx-auto pb-10 px-2">
      <div className="flex items-center justify-center gap-10 md:flex-row flex-col-reverse">
        <div
          className="flex justify-between items-center relative min-w-[310px] h-12"
          dir="rtl"
        >
          <input
            type="search"
            placeholder="סנן לפי שם"
            onChange={(e) => setSearchValue(e.target.value)}
            className="border-gray-200 bg-white shadow-xl py-3 px-2 rounded-xl text-sm min-w-[310px] h-12"
          />
          <div className="absolute bg-red-700 w-8 h-8 rounded-full flex justify-center items-center left-2">
            <GoSearch className="text-white" />
          </div>
        </div>

        <div className="flex sm:gap-16 gap-4 w-full items-center justify-center">
          <Select
            direction="rtl"
            className="sm:min-w-[310px] rounded-lg h-12 border-2 p-2"
            placeholder="סנן לפי חלק בגוף"
            options={bodyPartOptions}
            onChange={(e) => setBodyPart(e[0]?.value || "")}
            isMulti={false}
          />
          <Select
            direction="rtl"
            options={equipmentOptions}
            className="sm:min-w-[310px] rounded-lg h-12 border-2 p-2"
            placeholder="סנן לפי ציוד"
            onChange={(e) => setEquipment(e[0]?.value || "")}
            isMulti={false}
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
          {getFilteredExercises.length > 0 ? (
            getFilteredExercises.map((exercise) => (
              <CourseCart
                key={exercise?.exercise_id?._id}
                _id={exercise?.exercise_id?._id}
                exerciseId={exercise?.exercise_id?._id}
                handleOpen={() => handleOpen(exercise?.exercise_id?._id)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              לא נמצאו תרגילים
            </p>
          )}
        </div>
      )}

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
