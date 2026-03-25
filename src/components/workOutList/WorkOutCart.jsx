import { base_url } from "@/api/baseUrl";
import PaginationComp from "@/components/pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import Loading from "../common/Loading";
import Cart from "./Cart";

// Helper: Sort active trainings first, then deactive
function sortTrainingsByStatus(trainings = []) {
  return [...trainings].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (b.status === "active" && a.status !== "active") return 1;
    return 0;
  });
}

const WorkOutCart = () => {
  const [trainings, setTrainings] = useState([]);
  // For select, default is all *active* trainings, not all trainings
  const [selectedTraining, setSelectedTraining] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [exerciseReport, setExerciseReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(false);

  // Store sorted trainings so we can reuse
  const [sortedTrainings, setSortedTrainings] = useState([]);

  useEffect(() => {
    const fetchExercise = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/get-training-by-user-id/${user?._id}?page=${page}&search=${search}`
        );
        // Always sort so active is at top
        const sorted = sortTrainingsByStatus(response.data.data || []);

        setSortedTrainings(sorted);
        setTrainings(sorted);

        // Default value for select and displayed list: all active trainings
        if (!selectedTraining.length) {
          const activeTrainings = sorted.filter((t) => t.status === "active");
          setSelectedTraining(activeTrainings);
        }
        setPage(response.data.pagination.page);
        setTotalPages(response.data.pagination.pages);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
    // eslint-disable-next-line
  }, [user?._id, page, search]);

  // rendered cards: if user selects (including manual clear), show what is selected,
  // else (on initial mount), it's all active
  const displayedTrainings =
    selectedTraining && selectedTraining.length > 0
      ? selectedTraining
      : sortedTrainings.filter((t) => t.status === "active");

  const handleDownloadReport = async (e) => {
    e.preventDefault();

    if (downloadingReport) return;
    setDownloadingReport(true);
    try {
      const response = await axios.get(
        `${base_url}/report/excercise/${user?._id}`
      );
      const reportUrl = response.data.data.report_link;
      if (reportUrl) {
        setExerciseReport(reportUrl);
        const urlParts = reportUrl.split('/');
        const filename = urlParts[urlParts.length - 1] || 'exercise_report.xlsx';
        try {
          const token = localStorage.getItem("authToken");
          const fetchResponse = await fetch(reportUrl, {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            credentials: "include",
          });
          if (fetchResponse.ok) {
            const blob = await fetchResponse.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
              window.URL.revokeObjectURL(blobUrl);
            }, 100);
          } else {
            throw new Error("Fetch failed");
          }
        } catch (fetchError) {
          console.log("Fetch method failed, using direct download:", fetchError);

          const form = document.createElement("form");
          form.method = "GET";
          form.action = reportUrl;
          form.target = "_blank";
          form.style.display = "none";
          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);

          const link = document.createElement("a");
          link.href = reportUrl;
          link.download = filename;
          link.target = "_blank";
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (error) {
      console.error("Error downloading report:", error);
      if (exerciseReport) {
        window.open(exerciseReport, "_blank");
      }
    } finally {
      setDownloadingReport(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  console.log('displayedTrainings', trainings);

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 pb-6 sm:pb-10 w-full">
      <a
        onClick={handleDownloadReport}
        href={exerciseReport || "#"}
        className={`text-base sm:text-lg font-semibold flex items-center justify-center underline px-2 ${
          downloadingReport ? "cursor-wait opacity-50" : "cursor-pointer"
        }`}
      >
        {downloadingReport ? "טוען..." : "הצגת ביצועים קודמים"}
      </a>

      <div className="w-full flex justify-center my-4 sm:my-5 px-4" dir="rtl">
        <div className="w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 max-w-[480px]">
          <Select
            style={{ width: "100%" }}
            className="w-full h-12 text-base"
            direction="rtl"
            options={sortedTrainings}
            valueField="_id"
            labelField="name"
            onChange={(value) => setSelectedTraining(value)}
            placeholder="חפש תוכנית אימון"
            searchBy="name"
            values={
              selectedTraining && selectedTraining.length > 0
                ? selectedTraining
                : sortedTrainings.filter((t) => t.status === "active")
            }
          />
        </div>
      </div>

      {displayedTrainings.length > 0 && (
        <>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-2" dir="rtl">
            {displayedTrainings.map((training) =>
              (Array.isArray(training.workouts) ? training.workouts : []).map(
                (w, idx) => {
                  const workout = w.workout ? w.workout : w;
                  return (
                    <Cart
                      key={workout._id || idx}
                      workout={workout}
                      training={training}
                    />
                  );
                }
              )
            )}
          </div>

          {totalPages > 1 && (
            <div className="w-full overflow-x-auto px-2 mt-4">
              <PaginationComp
                setPage={setPage}
                totalPages={totalPages}
                currentPage={page}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WorkOutCart;

// import { base_url } from "@/api/baseUrl";
// import PaginationComp from "@/components/pagination";
// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import Select from "react-dropdown-select";
// import Loading from "../common/Loading";
// import Cart from "./Cart";

// // Helper: Sort active trainings first
// function sortTrainingsByStatus(trainings = []) {
//   return [...trainings].sort((a, b) => {
//     if (a.status === "active" && b.status !== "active") return -1;
//     if (b.status === "active" && a.status !== "active") return 1;
//     return 0;
//   });
// }

// const WorkOutCart = () => {
//   const [trainings, setTrainings] = useState([]);
//   const [selectedTraining, setSelectedTraining] = useState([]);
//   const [sortedTrainings, setSortedTrainings] = useState([]);

//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [totalPages, setTotalPages] = useState(1);

//   const [exerciseReport, setExerciseReport] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [downloadingReport, setDownloadingReport] = useState(false);

//   const user = JSON.parse(localStorage.getItem("userInfo"));

//   useEffect(() => {
//     if (!user?._id) return; // 🛑 stop if user missing

//     const fetchExercise = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${base_url}/get-training-by-user-id/${user._id}?page=${page}&search=${search}`
//         );

//         const apiTrainings = response?.data?.data || [];

//         const sorted = sortTrainingsByStatus(apiTrainings);

//         setSortedTrainings(sorted);
//         setTrainings(sorted);

//         // default: active trainings
//         if (!selectedTraining.length) {
//           const activeTrainings = sorted.filter(
//             (t) => t.status === "active"
//           );
//           setSelectedTraining(activeTrainings);
//         }

//         setPage(response?.data?.pagination?.page || 1);
//         setTotalPages(response?.data?.pagination?.pages || 1);
//       } catch (error) {
//         console.error("Error fetching exercises:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExercise();
//   }, [user?._id, page, search]);
//   console.log(trainings, "trainings");

//   // 🛡 Always return array
//   const displayedTrainings = useMemo(() => {
//     if (Array.isArray(selectedTraining) && selectedTraining.length > 0) {
//       return selectedTraining;
//     }

//     if (Array.isArray(sortedTrainings)) {
//       return sortedTrainings.filter((t) => t.status === "active");
//     }

//     return [];
//   }, [selectedTraining, sortedTrainings]);

//   const handleDownloadReport = async (e) => {
//     e.preventDefault();
//     if (!user?._id || downloadingReport) return;

//     setDownloadingReport(true);

//     try {
//       const response = await axios.get(
//         `${base_url}/report/excercise/${user._id}`
//       );

//       const reportUrl = response?.data?.data?.report_link;

//       if (reportUrl) {
//         setExerciseReport(reportUrl);
//         window.open(reportUrl, "_blank");
//       }
//     } catch (error) {
//       console.error("Error downloading report:", error);
//     } finally {
//       setDownloadingReport(false);
//     }
//   };

//   if (loading) return <Loading />;

//   return (
//     <div className="max-w-6xl mx-auto px-2 pb-10">
//       <a
//         onClick={handleDownloadReport}
//         href={exerciseReport || "#"}
//         className={`text-lg font-semibold flex items-center justify-center underline ${
//           downloadingReport ? "cursor-wait opacity-50" : "cursor-pointer"
//         }`}
//       >
//         {downloadingReport ? "טוען..." : "הצגת ביצועים קודמים"}
//       </a>

//       <div className="flex items-center justify-center my-5" dir="rtl">
//         <Select
//           style={{ width: "380px", height: "50px" }}
//           direction="rtl"
//           options={sortedTrainings || []}
//           valueField="_id"
//           labelField="name"
//           onChange={(value) =>
//             setSelectedTraining(Array.isArray(value) ? value : [])
//           }
//           placeholder="חפש תוכנית אימון"
//           searchBy="name"
//           values={
//             Array.isArray(selectedTraining) && selectedTraining.length > 0
//               ? selectedTraining
//               : sortedTrainings.filter((t) => t.status === "active")
//           }
//         />
//       </div>

//       {Array.isArray(displayedTrainings) &&
//         displayedTrainings.length > 0 && (
//           <>
//             <div className="flex flex-wrap items-center justify-center gap-6">
//               {displayedTrainings.map((training) =>
//                 Array.isArray(training?.workouts)
//                   ? training.workouts.map((w, idx) => {
//                       const workout = w?.workout ?? w;

//                       if (!workout) return null;

//                       return (
//                         <Cart
//                           key={workout?._id || idx}
//                           workout={workout}
//                           training={training}
//                         />
//                       );
//                     })
//                   : null
//               )}
//             </div>

//             {totalPages > 1 && (
//               <PaginationComp
//                 setPage={setPage}
//                 totalPages={totalPages}
//                 currentPage={page}
//               />
//             )}
//           </>
//         )}
//     </div>
//   );
// };

// export default WorkOutCart;
