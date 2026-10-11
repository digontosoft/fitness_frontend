// import { trainingandexercisebanner } from "@/assets/index";
import { base_url } from "@/api/baseUrl";
import { exerciseLibrary } from "@/assets/index";
import Title from "@/components/measurements/Tilte";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { TraineeExerciseLibraryCard } from "./TraineeExerciseLibraryCard";

const triggerBlobDownload = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const TraineeExerciseLibrary = () => {
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const [reportLoading, setReportLoading] = useState(false);

  const handleExerciseReportDownload = async () => {
    if (!user?._id || reportLoading) return;
    setReportLoading(true);
    try {
      const { data } = await axios.get(
        `${base_url}/report/excercise/${user._id}`,
        { responseType: "blob" }
      );
      triggerBlobDownload(data, "exercise-report.xlsx");
    } catch (error) {
      console.error("Error fetching exercise report:", error);
      toast.error("ההורדה נכשלה");
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="bg-[#FDFDFD] min-h-[75vh] h-auto">
        <WorkOutListBaground bgImg={exerciseLibrary} />
      <Title title={"ספריית תרגילים"} />
      {/* <div className="flex justify-center px-4">
        <button
          type="button"
          onClick={handleExerciseReportDownload}
          disabled={reportLoading}
          className={`text-base sm:text-lg font-semibold underline px-2 ${
            reportLoading ? "cursor-wait opacity-50" : "cursor-pointer"
          }`}
        >
          {reportLoading ? "טוען..." : "הצגת דוח ביצועי אימונים"}
        </button>
      </div> */}
      <TraineeExerciseLibraryCard />
    </div>
  );
};

export default TraineeExerciseLibrary;
