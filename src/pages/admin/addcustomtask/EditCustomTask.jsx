import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const EditCustomTask = ({ open, setOpen, userId, task, fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log('task', task);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      name: "",
      frequency: "",
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title || "",
        description: task.description || "",
        name: task.name || "",
        frequency: task.frequency || "",
      });
    }
  }, [task, reset]);

  const onSubmit = async (data) => {
    const payload = {
      user_id: userId,
      title: data.title,
      description: data.description,
      name: data.name,
      frequency: data.type,
    };
    setIsLoading(true);
    try {
      const response = await axios.put(`${base_url}/update-task-template/${task._id}`, payload);
      if (response.status === 200) {
        toast.success("Task updated successfully!");
        setIsLoading(false);
        setOpen(false);
        reset();
        fetchData();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95%] max-w-lg sm:max-w-xl md:max-w-2xl rounded-2xl p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          {/* Title */}
          <div className="space-y-2" dir="rtl">
            <Label htmlFor="title">כותרת המשימה</Label>
            <Input
              id="title"
              placeholder="כותרת המשימה"
              {...register("title", { required: "כותרת המשימה " })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2" dir="rtl">
            <Label htmlFor="description">תוכן המשימה </Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="תוכן המשימה "
              {...register("description", {
                required: "תוכן המשימה ",
                minLength: { value: 10, message: "Minimum 10 characters required" },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2" dir="rtl">
            <Label htmlFor="name">שם המשימה </Label>
            <Input
              id="name"
              placeholder="שם המשימה "
              {...register("name", { required: "שם המשימה " })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Task Type */}
          <div className="space-y-2" dir="rtl">
            <Label htmlFor="type">אינטרוול משימה</Label>
            <Controller
              name="frequency"
              control={control}
              rules={{ required: "אינטרוול משימה" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="frequency" className="w-full" dir="rtl">
                    <SelectValue placeholder=" בחר אינטרוול" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "1day", label: "One Day" },
                      { value: "2days", label: "Two Days" },
                      { value: "3days", label: "Three Days" },
                      { value: "1week", label: "One Week" },
                      { value: "2weeks", label: "Two Weeks" },
                      { value: "1month", label: "One Month" },
                    ].map((item) => (
                      <SelectItem key={item.value} value={item.value} dir="rtl">
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>

          {/* Footer */}
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto"
            >
              בטל
            </Button>
            <Button type="submit" className="w-full sm:w-auto bg-customBg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="mr-2 animate-spin" />Saving
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCustomTask;
