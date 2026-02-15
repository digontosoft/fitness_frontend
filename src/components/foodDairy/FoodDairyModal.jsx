import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminArrowCardWithoutImage from "../admin/components/ui/AdminArrowCardWithoutImage";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";

export function FoodDairyModal({ userId, onClose }) {
  console.log("user id", userId);
  const [foodDairy, setFoodDairy] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${base_url}/food-dairy/${userId}`);

        if (response.status === 200) {
          console.log("food data", response.data.data);
          setFoodDairy(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);
  if (!foodDairy || foodDairy.length === 0) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogTrigger asChild />
        <DialogContent className="max-w-4xl mx-auto w-[90%] h-[80%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] overflow-y-scroll">
          <DialogHeader>
            <DialogDescription>
              No food diary data available for this user.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Function to format the date into a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogTrigger asChild />
      <DialogContent className="max-w-4xl mx-auto w-[90%] h-[80%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] overflow-y-scroll">
        <DialogHeader>
          <DialogDescription className="text-right my-4">
            <div dir="rtl">פירוט יומן האכילה של הלקוח</div>
          </DialogDescription>
        </DialogHeader>

        {/* Iterate over the data and display it */}
        <div className="space-y-4" dir="rtl">
          {foodDairy.map((item) => (
            <div key={item._id} className="p-4 border-b">
              {/* Show date-wise data */}
              {item.date ? (
                <h4 className="text-xl font-bold mb-2" dir="rtl">
                  <span dir="rtl">Date: </span>
                  {formatDate(item.date)}
                </h4>
              ) : (
                <h4 className="text-xl font-bold mb-2">No Date</h4>
              )}

              <div className="tracking-wide leading-relaxed">
                <strong></strong> {item?.breakfast || "No data"}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="w-full justify-center bg-[#7994CB]">
              סגור
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
