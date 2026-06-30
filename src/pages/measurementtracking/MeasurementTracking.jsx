import { base_url } from "@/api/baseUrl";
import butt from "@/assets/image/butt.svg";
import leftArm from "@/assets/image/left-arm.svg";
import rightArm from "@/assets/image/right-arm.svg";
import Loading from "@/components/common/Loading";
import Title from "@/components/measurements/Tilte";
import axios from "axios";
import { useEffect, useState } from "react";
// import menHips from "@/assets/image/men-hips.svg";
import chest from "@/assets/image/chest.svg";
import leftLeg from "@/assets/image/left-leg.svg";
import maleChest from "@/assets/image/male-chest.svg";
import manWaist from "@/assets/image/man-waist.svg";
import rightLeg from "@/assets/image/right-thigh.svg";
import womenHips from "@/assets/image/women-hips.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import MeasurementSmallCart from "./MeasurementSmallCart";

const MeasurementTracking = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [open, setOpen] = useState(false);
  const [loadingCardKey, setLoadingCardKey] = useState(null);
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
   if (!id) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/get-measurement-by-id/${id}`
        );
        setMeasurements(response?.data?.data);
        // console.log('measurements:', response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  // console.log("measurement",measurements)

  const handleDownloadReport = async (e, cardKey) => {
    e.preventDefault();
    if (loadingCardKey !== null) return;

    setLoadingCardKey(cardKey);
    try {
      const { data: blob } = await axios.get(
        `${base_url}/report/measurement/${userId._id}`,
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "measurement_report.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching measurement report:", error);
    } finally {
      setLoadingCardKey(null);
    }
  };

  // const sortOrder = [
  //   "מותן",
  //   "חזה",
  //   "ירך ימין",
  //   "ירך שמאלה",
  //   "זרוע ימין",
  //   "זרוע שמאל",
  // ];

  // const sortedData = [...data].sort(
  //   (a, b) => sortOrder.indexOf(a.cartTitle) - sortOrder.indexOf(b.cartTitle)
  // );


  const sortOrder = [
  "מותן",
  "חזה",
  "ירך ימין",
  "ירך שמאל",
  "זרוע ימין",
  "זרוע שמאל",
];

// sort the carts according to the order
const sortedData = [...data].sort(
  (a, b) => sortOrder.indexOf(a.cartTitle) - sortOrder.indexOf(b.cartTitle)
);


  // console.log('measurement data:', data);

  return (
    <div className="overflow-x-hidden">
      <Title title={"לוח מדדים אישי"} />
      {loading ? (
        <Loading />
      ) : (
        <div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20 sm:pt-10 p-4"
          dir="rtl"
        >
          {sortedData.map((cart, index) => {
            const cardKey = cart._id ?? `${cart.cartTitle}-${index}`;
            let customImage = null;
            const items = Array.isArray(cart?.item) ? cart.item : [];

            if (cart.cartTitle === "זרוע ימין") {
              customImage = rightArm;
            } else if (cart.cartTitle === "זרוע שמאל") {
              customImage = leftArm;
            } else if (cart.cartTitle === "ירך ימין") {
              customImage = rightLeg;
            } else if (cart.cartTitle === "ישבן") {
              customImage = butt;
            } else if (cart.cartTitle === "מותן") {
              customImage = userId.gender === "male" ? manWaist : womenHips;
            } else if (cart.cartTitle === "ירך שמאל") {
              customImage = leftLeg;
            } else if (cart.cartTitle === "חזה") {
              customImage = gender === "male" ? maleChest : chest;
            }

            return (
              <div
                key={cart._id ?? `${cart.cartTitle}-${index}`}
                dir="rtl"
                className="border rounded-2xl p-4 flex flex-col space-y-4 bg-[#F1F0EB]"
              >
                {/* Title and Icon */}
                <div className="relative z-50 flex gap-2 items-center space-x-2">
                  {customImage ? (
                    <img
                      src={customImage}
                      alt="custom-icon"
                      className="w-6 h-6"
                    />
                  ) : cart.icon ? (
                    <img src={cart.icon} alt="icon" className="w-6 h-6" />
                  ) : null}
                  <h3 className="text-lg font-bold">{cart.cartTitle}</h3>
                </div>

                <div className="flex justify-center items-start"></div>
                <div className="flex justify-center items-center">
                  <MeasurementSmallCart
                    data={{
                      ...cart,
                      item: [...items].reverse(),
                    }}
                    setOpen={setOpen}
                    setId={setId}
                  />
                </div>
                <a
                  href="#"
                  onClick={(e) => handleDownloadReport(e, cardKey)}
                  className={`text-lg font-semibold text-center underline ${
                    loadingCardKey === cardKey ? 'cursor-wait opacity-50' : 'cursor-pointer'
                  }`}
                >
                  {loadingCardKey === cardKey ? 'טוען...' : 'הצגת מדדים קודמים'}
                </a>
              </div>
            );
          })}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <div className="px-4 py-2" dir="rtl">
            {/* Measurement Date in the middle at the top, RTL */}
            <div className="flex justify-center mb-2">
              {measurements?.date && (
                <span className="text-md font-semibold text-gray-700" dir="rtl">
                  תאריך מדידה:{" "}
                  {new Date(measurements.date).toLocaleDateString("he-IL")}
                </span>
              )}
            </div>
            {!measurements.photo1 && (
              <div className="text-center py-8">
                <span dir="rtl" className="text-gray-600">
                  לא הוספת תמונות למדידה״
                </span>
              </div>
            )}
            {measurements.photo1 && (
              <div className="flex flex-wrap justify-center items-center gap-4">
                {measurements.photo1 && (
                  <div className="w-[120px] h-[120px] flex items-center justify-center">
                    <img
                      src={
                        measurements.photo1?.startsWith("http://") || measurements.photo1?.startsWith("https://")
                          ? measurements.photo1
                          : `${base_url}/${measurements.photo1}`
                      }
                      alt="Photo 1"
                      className="w-full h-full rounded-lg object-contain border border-gray-200"
                      onError={(e) => {
                        console.error("Error loading photo1");
                        console.error("Path from DB:", measurements.photo1);
                        console.error(
                          "Constructed URL:",
                          measurements.photo1?.startsWith("http")
                            ? measurements.photo1
                            : `${base_url}/${measurements.photo1}`,
                        );
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
                {measurements.photo2 && (
                  <div className="w-[120px] h-[120px] flex items-center justify-center">
                    <img
                      src={
                        measurements.photo2?.startsWith("http://") || measurements.photo2?.startsWith("https://")
                          ? measurements.photo2
                          : `${base_url}/${measurements.photo2}`
                      }
                      alt="Photo 2"
                      className="w-full h-full rounded-lg object-contain border border-gray-200"
                      onError={(e) => {
                        console.error("Error loading photo2");
                        console.error("Path from DB:", measurements.photo2);
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
                {measurements.photo3 && (
                  <div className="w-[120px] h-[120px] flex items-center justify-center">
                    <img
                      src={
                        measurements.photo3?.startsWith("http://") || measurements.photo3?.startsWith("https://")
                          ? measurements.photo3
                          : `${base_url}/${measurements.photo3}`
                      }
                      alt="Photo 3"
                      className="w-full h-full rounded-lg object-contain border border-gray-200"
                      onError={(e) => {
                        console.error("Error loading photo3");
                        console.error("Path from DB:", measurements.photo3);
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
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

export default MeasurementTracking;
