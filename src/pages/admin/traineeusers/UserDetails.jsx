import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserDetails({ userId, isOpen, onClose }) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios.get(`${base_url}/getUser/${userId}`).then((response) => {
      if (response.status === 200) {
        setUserData(response.data.data);
      }
    });
  }, [userId]);
  console.log('user data:', userData);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button className="bg-[#7994CB] hover:bg-[#7994CB]-dark" size="sm">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl p-6 rounded-lg shadow-lg border border-gray-200 bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            פרטי מתאמן
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-y-4">
          {/* User Avatar */}
          <div className="w-24 h-24 rounded-full bg-[#7994CB] flex items-center justify-center shadow-md">
            <span className="text-3xl font-semibold text-gray-500">
              {userData?.firstName?.charAt(0)}
              {userData?.lastName?.charAt(0)}
            </span>
          </div>

          {/* User Information */}
          <div className="text-center space-y-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {userData?.firstName} {userData?.lastName}
            </h2>
            <p className="text-sm text-gray-500">{userData?.email}</p>
          </div>

          {/* Additional Info */}
          <div className="w-full flex flex-wrap justify-center gap-4 text-sm text-gray-700">
            <div className="px-4 py-2 bg-[#7994CB] rounded-lg shadow-sm">
              <span className="font-medium text-[#7994CB]-600 uppercase">
                {userData?.gender === "male" ? "זכר" : "נקבה"}
              </span>
            </div>
            <div className="px-4 py-2 bg-green-200 rounded-lg shadow-sm">
              <span className="font-medium text-green-600 uppercase">
                {userData?.userStatus === "active" ? "פעיל" : "לא פעיל"}
              </span>
            </div>
            <div className="px-4 py-2 bg-green-200 rounded-lg shadow-sm">
              <span className="font-medium text-green-600 uppercase">
                {userData?.userType === "trainee"
                  ? "משתמש מתאמן"
                  : userData?.userType === "recipe"
                  ? "משתמש ספר מתכונים"
                  : "Admin"}
              </span>
            </div>
          </div>
           <span className="font-medium text-blue-600">
      תוקף עד:{" "}
      {new Date(userData?.expiry_date).toLocaleDateString("he-IL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}
    </span>
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
  );
}
