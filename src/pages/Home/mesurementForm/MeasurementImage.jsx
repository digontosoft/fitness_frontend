import { base_url } from "@/api/baseUrl";
import Loading from "@/components/common/Loading";
import axios from "axios";
import { useEffect, useState } from "react";

const MeasurementImage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const Id = user?._id;
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeasurement = async () => {
      try {
        const response = await axios.get(`${base_url}/measurement/${Id}`);
        if (response.status === 200) {
          // sort by date (latest first)
          const sortedData = response.data.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setMeasurements(sortedData);
        }
      } catch (error) {
        console.error("Measurement data not found", error);
      } finally {
        setLoading(false);
      }
    };

    if (Id) {
      fetchMeasurement();
    }
  }, [Id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 my-20">
      <h2 className="text-2xl font-bold mb-4 text-center">תמונות מדידה</h2>

      {measurements.map((measurement, idx) => {
        const formattedDate = measurement.date
          ? new Date(measurement.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "No Date";

        const photos = [
          measurement.photo1,
          measurement.photo2,
          measurement.photo3,
          measurement.photo4,
        ].filter(Boolean);

        return (
          <div key={measurement._id || idx} className="mb-10">
            <p className="text-gray-600 mb-4 text-right" dir="rtl">
              תאריך: {formattedDate}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {photos.length > 0 ? (
                photos.map((photo, index) => (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden shadow-md border border-gray-200"
                  >
                    <img
                      src={photo}
                      alt={`Measurement ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No photos available</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MeasurementImage;
