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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const formatExpiryDate = (date) => {
  if (!date) return "";
  const parsed = moment(date);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};

function EditApproveMail({ id, email, updateDate, defaultExpiryDate }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      expiry_date: "",
      email: "",
    },
  });

  const loadMail = async () => {
    if (!id) return;
    try {
      setLoading(true);
      let data = null;
      try {
        const userRes = await axios.get(`${base_url}/getUser/${id}`);
        data = userRes.data?.data ?? userRes.data;
      } catch {
        const mailRes = await axios.get(`${base_url}/approved-mail/${id}`);
        data =
          mailRes.data?.approvedEmail ??
          mailRes.data?.data ??
          mailRes.data;
      }
      reset({
        expiry_date: formatExpiryDate(data?.expiry_date ?? defaultExpiryDate),
        email: data?.email ?? email ?? "",
      });
    } catch (error) {
      console.error("Error fetching expiry date:", error);
      reset({
        expiry_date: formatExpiryDate(defaultExpiryDate),
        email: email ?? "",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    await updateDate({
      email: data.email,
      expiry_date: data.expiry_date,
    });
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          reset({
            expiry_date: formatExpiryDate(defaultExpiryDate),
            email: email ?? "",
          });
          loadMail();
        }
      }}
    >
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
          {loading && (
            <p className="text-center text-sm text-muted-foreground py-2" dir="rtl">
              טוען…
            </p>
          )}
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
                className={`${errors.email ? "border-[#7994CB]" : ""} `}
              />
              {errors.email && (
                <p className="text-[#7994CB] text-sm mt-1" dir="rtl">
                  {errors.email.message}
                </p>
              )} */}
              <Label htmlFor="expiry_date" dir="rtl">
                תאריך סיום
              </Label>
              <Controller
                name="expiry_date"
                control={control}
                rules={{ required: "Expiry Date is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    dir="rtl"
                    id="expiry_date"
                    type="date"
                    disabled={loading}
                    value={field.value ?? ""}
                    className={`${
                      errors.expiry_date ? "border-[#7994CB]" : ""
                    } flex items-center justify-end`}
                  />
                )}
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
