import FormTitle from "../ui/FormTitle";
import AdminArrowCard from "../ui/AdminArrowCard";
import { ArrowDumbel, ArrowBurger } from "@/assets";
import AdminArrowCardWithoutImage from "../ui/AdminArrowCardWithoutImage";
import { Button } from "@/components/ui/button";
import TraineeRightCard from "./TraineeRightCard";
import TraineeLeftCard from "./TraineeLeftCard";
import { useEffect, useState } from "react";
import { base_url } from "@/api/baseUrl";
import axios from "axios";
import { toast } from "sonner";

const TraineerUi = ({ userId }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${base_url}/getUser/${userId}`);
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

  useEffect(() => {
    userId;
  }, [userId]);

  const updateStatus = async (userType) => {
    try {
      const response = await axios.post(`${base_url}/updateUserInfo`, {
        user_id: user._id,
        userType,
      });
      if (response.status === 200) {
        toast.success("User Type Updated Successfully");
        setUser((prevUser) => ({
          ...prevUser,
          userType,
        }));
      }
    } catch (error) {}
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <FormTitle title="ניהול מתאמנים" />
        <span className="flex items-center gap-2 flex-row-reverse">
          {userId ? (
            <span>{user?.firstName + " " + user?.lastName}</span>
          ) : (
            <></>
          )}
          <Button
            className="bg-customBg"
            size="sm"
            onClick={() =>
              updateStatus(user?.userType === "admin" ? "trainee" : "admin")
            }
          >
            {user?.userType === "admin" ? "Make Trainer" : "Make Admin"}
          </Button>
        </span>
      </div>
      <div className="flex items-center justify-center gap-5">
        <TraineeRightCard />
        <TraineeLeftCard />
      </div>
      <div className="flex items-center justify-center">
        <span className="text-xl font-bold leading-6 text-textColor text-center">
          משימות
        </span>
      </div>
      <div className="flex items-center justify-center gap-5">
        <AdminArrowCard
          image={ArrowBurger}
          title="ניהול תפריטי תזונה אישיים"
          link={`/dashboard/add-nutrition-menu/${userId}`}
        />
        <AdminArrowCard
          image={ArrowDumbel}
          title="ניהול תוכנית אימון"
          link={`/dashboard/training-list/${userId}`}
        />
      </div>
      <div className="flex items-center justify-center gap-5">
        <AdminArrowCardWithoutImage title="להורדת דוח מדדים אישי" />
        <AdminArrowCardWithoutImage title="מסמכים מקושרים להורדה" />
      </div>
      <div className="flex justify-center items-center">
        <Button className="bg-custom-radial text-white rounded-full">
          שמור והמשך
        </Button>
      </div>
    </div>
  );
};

export default TraineerUi;
