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
  const [downloadingReport, setDownloadingReport] = useState(false);
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

  const handleDownloadReport = async (e) => {
    e.preventDefault();
    
    if (downloadingReport) return; // Prevent multiple clicks
    
    setDownloadingReport(true);
    try {
      const response = await axios.get(
        `${base_url}/report/excercise/${user?._id}`
      );
      const reportUrl = response.data.data.report_link;
      
      if (reportUrl) {
        setExerciseReport(reportUrl);
        
        // Fetch the file as a blob to handle CORS and cross-domain issues
        const fileResponse = await axios.get(reportUrl, {
          responseType: 'blob',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/octet-stream, */*'
          }
        });
        
        // Create a blob URL from the response
        const blob = new Blob([fileResponse.data], {
          type: fileResponse.headers['content-type'] || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const blobUrl = window.URL.createObjectURL(blob);
        
        // Extract filename from URL or use a default name
        const urlParts = reportUrl.split('/');
        const filename = urlParts[urlParts.length - 1] || 'exercise_report.xlsx';
        
        // Create a temporary anchor element and trigger download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL after a short delay
        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
        }, 100);
      }
    } catch (error) {
      console.error("Error downloading report:", error);
      // Fallback: try opening in new window if blob download fails
      if (exerciseReport) {
        window.open(exerciseReport, '_blank');
      }
    } finally {
      setDownloadingReport(false);
    }
  };


  if(loading) {
    return (
     <Loading />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-2 pb-10">
      <a
        onClick={handleDownloadReport}
        href={exerciseReport || '#'}
        className={`text-lg font-semibold flex items-center justify-center underline ${
          downloadingReport ? 'cursor-wait opacity-50' : 'cursor-pointer'
        }`}
      >
        {downloadingReport ? 'טוען...' : 'הצגת ביצועים קודמים'}
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
