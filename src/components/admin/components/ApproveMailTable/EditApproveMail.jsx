import { base_url } from "@/api/baseUrl";
import BasicButton from "@/components/admin/components/ui/BasicButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Ensure consistency with other dialogs
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { Edit } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function EditApproveMail({ id, updateDate }) {
  const [loading, setLoading] = useState(false);
  const [approvedEmail, setApprovedEmail] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getMail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/approved-mail/${id}`);
        const data = response.data.approvedEmail;

        setApprovedEmail(data);
      } catch (error) {
        console.error("Error fetching email:", error);
      } finally {
        setLoading(false);
      }
    };
    getMail();
  }, [id]);

  const onSubmit = async (data) => {
    await updateDate(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#7994CB] hover:bg-[#7994CB]-dark" size="sm">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            ערוך כתובת מייל מאושרת
          </DialogTitle>
        </DialogHeader>
        {/* Add form fields or other content here */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              {/* <Label htmlFor="email" dir="rtl">
                דואר אלקטרוני
              </Label>
              <Input
                dir="rtl"
                id="email"
                type="email"
                defaultValue={approvedEmail.email}
                disabled
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`${errors.email ? "border-red-500" : ""} `}
              />
              {errors.email && (
                <p className="text-[#7994CB] text-sm mt-1" dir="rtl">
                  {errors.email.message}
                </p>
              )} */}
              <Label htmlFor="expiry_date" dir="rtl">
                תאריך סיום
              </Label>
              <Input
                dir="rtl"
                id="expiry_date"
                type="date"
                defaultValue={moment(approvedEmail.expiry_date).format(
                  "YYYY-MM-DD"
                )}
                {...register("expiry_date", {
                  required: "Expiry Date is required",
                })}
                className={`${
                  errors.expiry_date ? "border-red-500" : ""
                } flex items-center justify-end`}
              />
              {errors.expiry_date && (
                <p className="text-[#7994CB] text-sm mt-1" dir="rtl">
                  {errors.expiry_date.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <BasicButton type="submit" title="עדכן" className="bg-[#7994CB]" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditApproveMail;
