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
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { base_url } from "@/api/baseUrl";
import axios from "axios";

export default function UserDetails({ userId }) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios.get(`${base_url}/getUser/${userId}`).then((response) => {
      if (response.status === 200) {
        setUserData(response.data.data);
      }
    });
  }, [userId]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-customBg hover:bg-customBg-dark" size="sm">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl p-6 rounded-lg shadow-lg border border-gray-200 bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-y-4">
          {/* User Avatar */}
          <div className="w-24 h-24 rounded-full bg-red-200 flex items-center justify-center shadow-md">
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
            <div className="px-4 py-2 bg-red-200 rounded-lg shadow-sm">
              <span className="font-medium text-red-600 uppercase">
                {userData?.gender}
              </span>
            </div>
            <div className="px-4 py-2 bg-green-200 rounded-lg shadow-sm">
              <span className="font-medium text-green-600 uppercase">
                {userData?.userStatus}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full bg-customBg hover:bg-customBg-dark transition-all duration-200">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
