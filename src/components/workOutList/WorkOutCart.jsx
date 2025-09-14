// import { base_url } from "@/api/baseUrl";
// import PaginationComp from "@/components/pagination";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Select from "react-dropdown-select";
// import RecurringCard from "../home/RecurringCard";
// import Cart from "./Cart";

// const WorkOutCart = () => {
//   const [trainings, setTrainings] = useState({});
//   const [selectedTraining, setSelectedTraining] = useState(null);

//   const user = JSON.parse(localStorage.getItem("userInfo"));
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [totalPages, setTotalPages] = useState(1);
//   const [exerciseReport, setExerciseReport] = useState(null);
//   const [recurringTasks, setRecurringTasks] = useState([]);
//    const fetchUserRecurringTasks = async () => {
//       try {
//         const response = await axios.get(`${base_url}/get-user-recurring-tasks/${user._id}`);
//         console.log("recurringTasks:", response.data.data);
//         setRecurringTasks(response.data.data);
//       } catch (error) {
//         console.error("Error fetching email:", error);
//         throw error;
//       }
//     };
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
//     fetchUserRecurringTasks();
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
//        <div className="flex flex-wrap justify-center items-center gap-10">

//         {
//           recurringTasks.length > 0 && (
//           recurringTasks?.map((task) => (
//             <RecurringCard key={task?._id} recurringTasks={task} setRecurringTasks={setRecurringTasks} />
//           ))
            
//           )
//         }
//         {
//           trainings?.length && recurringTasks?.length === 0 && (
//              <p className="text-center my-5">Not training assigned yet!!!</p>
//           )
//         }
//         </div>
//     </div>
//   );
// };

// export default WorkOutCart;



import { base_url } from "@/api/baseUrl";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Select from "react-dropdown-select";
import RecurringCard from "../home/RecurringCard";
import Cart from "./Cart";

const WorkOutCart = () => {
  const [trainings, setTrainings] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [recurringTasks, setRecurringTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [exerciseReport, setExerciseReport] = useState(null);

  // ✅ Fetch recurring tasks
  const fetchUserRecurringTasks = async () => {
    try {
      const response = await axios.get(
        `${base_url}/get-user-recurring-tasks/${user._id}`
      );
      setRecurringTasks(response.data.data || []);
    } catch (error) {
      console.error("Error fetching recurring tasks:", error);
    }
  };

  // ✅ Fetch exercise report
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
    fetchUserRecurringTasks();
  }, [user?._id]);

  // ✅ Fetch trainings
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(
          `${base_url}/get-training-by-user-id/${user?._id}`
        );
        setTrainings(response.data.data || []);
        setPage(response.data.pagination.page);
        setTotalPages(response.data.pagination.pages);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };
    fetchExercise();
  }, [user?._id, page, search]);

  // ✅ Merge trainings + recurring tasks for dropdown
  const dropdownOptions = useMemo(() => {
    const trainingOptions = trainings.map((t) => ({
      ...t,
      type: "training",
      label: t.name,
      value: t._id,
    }));

    const recurringOptions = recurringTasks.map((r) => ({
      ...r,
      type: "recurring",
      label: r.title || r.name,
      value: r._id,
    }));

    return [...trainingOptions, ...recurringOptions];
  }, [trainings, recurringTasks]);

  return (
    <div className="max-w-6xl mx-auto px-2 pb-10">
      {/* Report link */}
      <a
        href={exerciseReport}
        download
        className="text-lg font-semibold flex items-center justify-center underline cursor-pointer"
      >
        הצגת ביצועים קודמים
      </a>

      {/* Searchable single-select dropdown */}
      <div className="flex items-center justify-center my-5" dir="rtl">
        <Select
          style={{ width: "380px", height: "50px" }}
          direction="rtl"
          options={dropdownOptions}
          values={selectedItem ? [selectedItem] : []}
          onChange={(value) => setSelectedItem(value[0] || null)}
          placeholder="חפש תוכנית אימון או משימה חוזרת"
          searchBy="label"
          valueField="value"
          labelField="label"
        />
      </div>

      {/* Trainings Section */}
      <div className="flex flex-wrap items-center justify-center gap-6 my-10">
  {(!selectedItem || selectedItem.type === "training") &&
    (selectedItem
      ? 
        trainings
          .filter((t) => t._id === selectedItem.value)
          .flatMap((training) =>
            training.workouts?.map((workout) => (
              <Cart key={workout._id} workout={workout} training={training} />
            ))
          )
      : 
        trainings.flatMap((training) =>
          training.workouts?.map((workout) => (
            <Cart key={workout._id} workout={workout} training={training} />
          ))
        ))}
</div>


      

      {/* Recurring Tasks Section */}
      <div className="flex flex-wrap justify-center items-center gap-10">
        {(!selectedItem || selectedItem.type === "recurring") &&
          (selectedItem
            ? // 👉 Show only the selected task
              recurringTasks
                .filter((task) => task._id === selectedItem.value)
                .map((task) => (
                  <RecurringCard
                    key={task._id}
                    recurringTasks={task}
                    setRecurringTasks={setRecurringTasks}
                  />
                ))
            : // 👉 Show all tasks if nothing selected
              recurringTasks.map((task) => (
                <RecurringCard
                  key={task._id}
                  recurringTasks={task}
                  setRecurringTasks={setRecurringTasks}
                />
              )))}

      </div>
    </div>
  );
};

export default WorkOutCart;
