import { base_url } from "@/api/baseUrl";
import Title from "@/components/measurements/Tilte";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import rightArm from "@/assets/image/right-arm.svg";
import leftArm from "@/assets/image/left-arm.svg";
import butt from "@/assets/image/butt.svg";
// import menHips from "@/assets/image/men-hips.svg";
import chest from "@/assets/image/chest.svg";
import maleChest from "@/assets/image/male-chest.svg";
import womenHips from "@/assets/image/women-hips.svg";
import leftLeg from "@/assets/image/left-leg.svg";
import rightLeg from "@/assets/image/right-thigh.svg";
import manWaist from "@/assets/image/man-waist.svg";
import MeasurementSmallCart from "./MeasurementSmallCart";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MeasurementTracking = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [open, setOpen] = useState(false);
  const [measurementReport, setMeasurementReport] = useState(null);
  const userId = JSON.parse(localStorage.getItem("userInfo"));
  const gender = userId?.gender;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/measurement/calculate/${userId?._id}`
        );
        if (response.status === 200) {
          setData(response?.data);
          console.log("measurement tracking data", response?.data);
        }
        const measurementResponse = await axios.get(
          `${base_url}/report/measurement/${userId._id}`
        );

        if (measurementResponse.status === 200) {
          setMeasurementReport(measurementResponse?.data.data.report_link);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId?._id]);

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

  const sortOrder = [
    "מותן",
    "חזה",
    "ירך ימין",
    "ירך שמאלה",
    "זרוע ימין",
    "זרוע שמאל",
  ];

  const sortedData = [...data].sort(
    (a, b) => sortOrder.indexOf(a.cartTitle) - sortOrder.indexOf(b.cartTitle)
  );

  return (
    <div>
      <Title title={"מעקב מדדים"} />
      {loading ? (
        <Loading />
      ) : (
        <div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20 sm:pt-10 p-4"
          dir="rtl"
        >
          {data.map((data) => {
            let customImage = null;

            if (data.cartTitle === "זרוע ימין") {
              customImage = rightArm;
            } else if (data.cartTitle === "זרוע שמאל") {
              customImage = leftArm;
            } else if (data.cartTitle === "ירך ימין") {
              customImage = rightLeg;
            } else if (data.cartTitle === "ישבן") {
              customImage = butt;
            } else if (data.cartTitle === "מותן") {
              customImage = userId.gender === "male" ? manWaist : womenHips;
            } else if (data.cartTitle === "ירך שמאל") {
              customImage = leftLeg;
            } else if (data.cartTitle === "חזה") {
              customImage = gender === "male" ? maleChest : chest;
            }

            return (
              <div
                key={data._id}
                dir="rtl"
                className="border rounded-2xl p-4 flex flex-col space-y-4 bg-[#EEEEEE]"
              >
                {/* Title and Icon */}
                <div className="relative z-50 flex gap-2 items-center space-x-2">
                  {customImage ? (
                    <img
                      src={customImage}
                      alt="custom-icon"
                      className="w-6 h-6"
                    />
                  ) : data.icon ? (
                    <img src={data.icon} alt="icon" className="w-6 h-6" />
                  ) : null}
                  <h3 className="text-lg font-bold">{data.cartTitle}</h3>
                </div>

                <div className="flex justify-center items-start"></div>
                <div className="flex justify-center items-center">
                  <MeasurementSmallCart
                    data={data}
                    setId={setId}
                    setOpen={setOpen}
                  />
                </div>
                <a
                  href={measurementReport}
                  download
                  className="text-lg font-semibold text-center underline cursor-pointer"
                >
                  הצגת מדדים קודמים
                </a>
              </div>
            );
          })}
        </div>
      )}
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

export default MeasurementTracking;
