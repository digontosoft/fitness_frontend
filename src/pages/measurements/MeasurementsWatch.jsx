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
import { useLocation } from "react-router-dom";

const MeasurementsWatch = () => {
  const location = useLocation();

  // Create a URLSearchParams object to extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [measurements, setMeasurements] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/get-measurement-by-id/${id}`
        );
        setMeasurements(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  console.log("measurements:", measurements);

  return (
    <div>
      <Title title={"דוח מדדים אישי"} className="py-0" />
      <SingleCart userId={userId} setOpen={setOpen} setId={setId} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="min-h-44 px-6" dir="rtl">
            {!measurements.photo1 && (
              <span dir="rtl">לא הוספת תמונות למדידה״</span>
            )}
            {measurements.photo1 && (
              <div className="grid justify-center gap-3">
                <img src={`${base_url}/${measurements.photo1}`} alt="" />
                <img src={`${base_url}/${measurements.photo2}`} alt="" />
                <img src={`${base_url}/${measurements.photo3}`} alt="" />
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full bg-[#7994CB] hover:bg-[#7994CB]-dark transition-all duration-200">
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
