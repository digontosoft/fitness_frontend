"use client";

import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const TaskModal = ({ open, setOpen, userId, fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      user_id: userId,
      title: data.title,
      description: data.description,
      name: data.name,
      frequency: data.type,
    };
    setIsLoading(true);
    try{
      const response = await axios.post(`${base_url}/create-task-template`, payload);
      if(response.status === 201){
        toast.success("Task added successfully!");
         setIsLoading(false);
         setOpen(false);
         reset(); 
         fetchData();
      }
    }catch(error){
      console.log(error);
    }
    console.log("Form Submitted:", payload);
   
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95%] max-w-lg sm:max-w-xl md:max-w-2xl rounded-2xl p-6" dir="rtl">
        <DialogHeader dir="rtl">
          <DialogTitle className="text-lg font-semibold sm:text-xl text-right" dir="rtl">
            שייך משימה מותאמת אישית
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6" dir="rtl">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">כותרת המשימה</Label>
            <Input
              id="title"
              placeholder="כותרת המשימה"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">תוכן המשימה</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="תוכן המשימה"
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Minimum 10 characters required" },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">שם המשימה</Label>
            <Input
              id="name"
              placeholder="שם המשימה"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Task Type */}
          <div className="space-y-2">
            <Label htmlFor="type">אינטרוול משימה</Label>
            <Controller
              name="type"
              control={control}
              rules={{ required: "Task type is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="type" className="w-full" dir="rtl">
                    <SelectValue placeholder="בחר אינטרוול"  />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "oncetime", label: "חד פעמי" },
                      { value: "1day", label: "כל יום" },
                      { value: "2days", label: "כל יומיים" },
                      { value: "3days", label: "כל שלושה ימים" },
                      { value: "1week", label: "כל שבוע" },
                      { value: "2weeks", label: "כל שבועיים" },
                      { value: "1month", label: "כל חודש" },
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
       <DialogFooter 
  className="flex flex-col-reverse sm:flex-row justify-end sm:gap-2" 
  dir="ltr"   // force flexbox to work as LTR
>
  <Button
    type="button"
    variant="outline"
    onClick={() => setOpen(false)}
    className="w-full sm:w-auto"
    dir="rtl"
  >
    בטל
  </Button>
  <Button 
    type="submit" 
    className="w-full sm:w-auto bg-customBg" 
    disabled={isLoading}
    dir="rtl"
  >
    {isLoading ? (
      <>
        <Loader className="mr-2 animate-spin" />
        שייך משימה מותאמת אישית
      </>
    ) : (
      "שייך משימה מותאמת אישית"
    )}
  </Button>
</DialogFooter>


        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
