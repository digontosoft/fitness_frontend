import { base_url } from "@/api/baseUrl";
import Loading from "@/components/common/Loading";
import axios from "axios";
import { useEffect, useState } from "react";

const MeasurementImage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const Id = user?._id;
  const [measurement, setMeasurement] = useState(null);

  useEffect(() => {
    const fetchMeasurement = async () => {
      try {
        const response = await axios.get(`${base_url}/measurement/${Id}`);
        if (response.status === 200) {
          setMeasurement(response.data.data);
        }
      } catch (error) {
        console.error("Measurement data not found", error);
      }
    };

    if (Id) {
      fetchMeasurement();
    }
  }, [Id]);

  if (!measurement) {
    return (
     <Loading />
    );
  }

  // Format date
  const formattedDate = new Date(measurement.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const photos = [measurement.photo1, measurement.photo2, measurement.photo3].filter(Boolean);

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 my-20">
      <h2 className="text-2xl font-bold mb-4 text-center">תמונות מדידה</h2>
      <p className="text-gray-600 mb-6" dir="rtl">תאריך: {formattedDate}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-md border border-gray-200"
          >
            <img
              src={`${base_url}/${photo}`}
              alt={`Measurement ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeasurementImage;
