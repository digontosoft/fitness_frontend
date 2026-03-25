import { base_url } from "@/api/baseUrl";
import PaginationComp from "@/components/pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { GoSearch } from "react-icons/go";
import Loading from "../common/Loading";
import CourseCart from "../courseList/CourseCart";
import CourseDetails from "../courseList/course/CourseDetails";


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


export const TraineeExerciseLibraryCard = () => {
  const [exercises, setExercises] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [body_part, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchExercise = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
        //   `${base_url}/get-training-by-user-id/${user?._id}`
        `${base_url}/exercise?search=${searchValue}&page=${page}&limit=${limit}&body_part=${body_part}&equipment=${equipment}`
        );
        setExercises(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setPage(response.data.pagination.currentPage);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [searchValue, page, body_part, equipment]);


  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };


  const getFilteredExercises = 
 exercises.filter((exercise) => {
        const nameMatch = exercise?.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());

        const bodyPartMatch = body_part
          ? exercise?.body_part === body_part
          : true;

        const equipmentMatch = equipment
          ? exercise?.equipment === equipment
          : true;

        return nameMatch && bodyPartMatch && equipmentMatch;
      })
   
  return (
    <div className="max-w-6xl mx-auto pb-10 px-2 sm:px-4">
      <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 md:flex-row flex-col-reverse w-full">
      <div
  className="flex items-center relative w-3/4 sm:w-auto md:w-[310px] h-12"
  dir="rtl"
>
  <input
    type="search"
    placeholder="סנן לפי שם"
    onChange={(e) => setSearchValue(e.target.value)}
    className="border-gray-200 bg-white shadow-xl py-3 pl-10 pr-3 rounded-xl text-sm w-full h-12"
  />

  <div className="absolute left-2 bg-[#7994CB] w-8 h-8 rounded-full flex justify-center items-center">
    <GoSearch className="text-white" />
  </div>
</div>

        <div className="flex flex-col sm:flex-row sm:gap-4 md:gap-16 gap-4 w-full sm:w-auto items-center justify-center">
          <Select
            direction="rtl"
            className="w-full sm:min-w-[310px] rounded-lg h-12 border-2 p-2"
            placeholder="סנן לפי חלק בגוף"
            options={bodyPartOptions}
            onChange={(e) => setBodyPart(e[0]?.value || "")}
            isMulti={false}
          />
          <Select
            direction="rtl"
            options={equipmentOptions}
            className="w-full sm:min-w-[310px] rounded-lg h-12 border-2 p-2"
            placeholder="סנן לפי ציוד"
            onChange={(e) => setEquipment(e[0]?.value || "")}
            isMulti={false}
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6">
          {getFilteredExercises.length > 0 ? (
            getFilteredExercises.map((exercise) => (
              <CourseCart
                key={exercise?._id}
                _id={exercise?._id}
                exercise={exercise}
                handleOpen={() => handleOpen(exercise?._id)}
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
        <div className="w-full overflow-x-auto px-2">
          <PaginationComp
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};
