import { useEffect, useState } from "react";
import Cart from "./Cart";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import { Input } from "@/components/ui/input";
import PaginationComp from "@/components/pagination";

const WorkOutCart = () => {
  const [trainings, setTrainings] = useState({});

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(
          `${base_url}/get-training-by-user-id/${user._id}?page=${page}&&limit=20&&search=${search}`
        );

        setTrainings(response.data.data);
        setPage(response.data.pagination.page);
        setTotalPages(response.data.pagination.pages);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercise();
  }, [user?._id, page, search]);

  return (
    <div className="max-w-6xl mx-auto px-2 pb-10">
      <div className="flex items-center justify-center my-5">
        <Input
          dir="rtl"
          placeholder="סנן לפי שם תוכנית אימון ..."
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      {trainings.length > 0 ? (
        <>
          <div className=" grid grid-cols-2 md:grid-cols-3 gap-6">
            {trainings.map((training) =>
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
      ) : (
        <p className="text-center my-5">Not training assigned yet!!!</p>
      )}
    </div>
  );
};

export default WorkOutCart;
