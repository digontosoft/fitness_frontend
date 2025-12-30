// import { base_url } from "@/api/baseUrl";
// import PaginationComp from "@/components/pagination";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Select from "react-dropdown-select";
// import Cart from "./Cart";

// const WorkOutCart = () => {
//   const [trainings, setTrainings] = useState({});
//   const [selectedTraining, setSelectedTraining] = useState(null);

//   const user = JSON.parse(localStorage.getItem("userInfo"));
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [totalPages, setTotalPages] = useState(1);
//   const [exerciseReport, setExerciseReport] = useState(null);

//   useEffect(() => {
//     const fetchExerciseReport = async () => {
//       try {
//         const response = await axios.get(
//           `${base_url}/report/excercise/${user?._id}`
//         );
//         setExerciseReport(response.data.data.report_link);
//       } catch (error) {
//         console.error("Error fetching exercises:", error);
//       }
//     };
//     fetchExerciseReport();
//   }, [user?._id]);

//   useEffect(() => {
//     const fetchExercise = async () => {
//       try {
//         const response = await axios.get(
//           `${base_url}/get-training-by-user-id/${user?._id}`
//         );

//         setTrainings(response.data.data);
//         setPage(response.data.pagination.page);
//         setTotalPages(response.data.pagination.pages);
//         console.log(response);
//       } catch (error) {
//         console.error("Error fetching exercises:", error);
//       }
//     };
//     fetchExercise();
//   }, [user?._id, page, search]);

  

//   return (
//     <div className="max-w-6xl mx-auto px-2 pb-10">
//       <a
//         href={exerciseReport}
//         download
//         className="text-lg font-semibold flex items-center justify-center underline cursor-pointer"
//       >
//         הצגת ביצועים קודמים
//       </a>
//       <div className="flex items-center justify-center my-5" dir="rtl">
//         <Select
//           // className="max-w-lg"
//           style={{ width: "380px", height: "50px" }}
//           direction="rtl"
//           options={trainings}
//           valueField="_id"
//           labelField="name"
//           onChange={(value) => setSelectedTraining(value)}
//           placeholder="חפש תוכנית אימון"
//           searchBy="name"
//         />
//       </div>
//       {trainings.length > 0 && (
//         <>
//           <div className="flex flex-wrap items-center justify-center gap-6">
//             {selectedTraining?.map((training) =>
//               training.workouts.map((workout) => (
//                 <Cart key={workout._id} workout={workout} training={training} />
//               ))
//             )}
//           </div>
//           {totalPages > 1 && (
//             <PaginationComp
//               setPage={setPage}
//               totalPages={totalPages}
//               currentPage={page}
//             />
//           )}
//         </>
//       ) }
//     </div>
//   );
// };

// export default WorkOutCart;



import { base_url } from "@/api/baseUrl";
import PaginationComp from "@/components/pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import Loading from "../common/Loading";
import Cart from "./Cart";

const WorkOutCart = () => {
  const [trainings, setTrainings] = useState([]); // ✅ keep as array
  const [selectedTraining, setSelectedTraining] = useState(null);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [exerciseReport, setExerciseReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExerciseReport = async () => {
      try {
        const response = await axios.get(
          `${base_url}/report/excercise/${user?._id}`
        );
        setExerciseReport(response.data.data.report_link);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExerciseReport();
  }, [user?._id]);

  useEffect(() => {
    const fetchExercise = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/get-training-by-user-id/${user?._id}?page=${page}&search=${search}`
        );

        setTrainings(response.data.data || []);
        setPage(response.data.pagination.page);
        setTotalPages(response.data.pagination.pages);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [user?._id, page, search]);

  // ✅ if no training is selected, show all
  const displayedTrainings = selectedTraining?.length
    ? selectedTraining
    : trainings;


  if(loading) {
    return (
     <Loading />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-2 pb-10">
      <a
        href={exerciseReport}
        download
        className="text-lg font-semibold flex items-center justify-center underline cursor-pointer"
      >
        הצגת ביצועים קודמים
      </a>

      <div className="flex items-center justify-center my-5" dir="rtl">
        <Select
          style={{ width: "380px", height: "50px" }}
          direction="rtl"
          options={trainings}
          valueField="_id"
          labelField="name"
          onChange={(value) => setSelectedTraining(value)}
          placeholder="חפש תוכנית אימון"
          searchBy="name"
        />
      </div>

      {displayedTrainings.length > 0 && (
        <>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {displayedTrainings.map((training) =>
              training.workouts.map((workout) => (
                <Cart key={workout._id} workout={workout} training={training} />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <PaginationComp
              setPage={setPage}
              totalPages={totalPages}
              currentPage={page}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WorkOutCart;
