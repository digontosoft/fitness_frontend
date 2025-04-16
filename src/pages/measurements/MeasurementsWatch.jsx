import { base_url } from "@/api/baseUrl";
import SingleCart from "@/components/measurements/measurementWatch/SingleCart";
import Title from "@/components/measurements/Tilte";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";
import React, { useEffect } from "react";
import { use } from "react";
import { useLocation, useParams } from "react-router-dom";

const MeasurementsWatch = () => {
  const location = useLocation();

  // Create a URLSearchParams object to extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  console.log("id:", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/get-measurement-by-id/${id}`
        );
        console.log("response:", response);
        setData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  console.log("data:", data);

  return (
    <div>
      <Title title={"מעקב מדדים"} className="py-0" />
      <SingleCart userId={userId} setOpen={setOpen} setId={setId} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="min-h-44 px-6" dir="rtl">
            {!data.photo1 && <span dir="rtl">לא הוספת תמונות למדידה״</span>}
            {data.photo1 && (
              <div className="grid justify-center gap-3">
                <img src={`${base_url}/${data.photo1}`} alt="" />
                <img src={`${base_url}/${data.photo2}`} alt="" />
                <img src={`${base_url}/${data.photo3}`} alt="" />
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full bg-customBg hover:bg-customBg-dark transition-all duration-200">
                סגור
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeasurementsWatch;
