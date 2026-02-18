import { base_url } from "@/api/baseUrl";
import { Badge } from "@/components/ui/badge"; // Import Badge component
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator"; // Import Separator component
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function RecurringTasksCard({
  isRecurringModalOpen,
  setIsRecurringModalOpen,
  selectedTask,
  setRecurringTasks
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios
        .post(`${base_url}/complete-recurring-task/${selectedTask?._id}`)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Task completed successfully!");
            setRecurringTasks((prevTasks) => prevTasks.filter((task) => task._id !== selectedTask._id));
            setIsRecurringModalOpen(false);
            setLoading(false);
          }
        });
    } catch (error) {
      console.error("Error submitting steps:", error);
    }
  };

  return (
    <Dialog open={isRecurringModalOpen} onOpenChange={setIsRecurringModalOpen} dir="rtl">
      <DialogContent className="border-none p-6">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-3xl font-bold">{selectedTask?.name}</DialogTitle>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{selectedTask?.title}</p>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-md leading-6 text-gray-800 dark:text-gray-200 px-4">
            {selectedTask?.description}
          </p>

          <Badge 
            className={`text-sm font-medium px-4 py-1 rounded-full ${
              selectedTask?.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : selectedTask?.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Status: {selectedTask?.status}
          </Badge>
        </div>
        
        <Separator className="my-4" />

        <DialogFooter className="w-full">
          <Button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-[#7994CB] transition-colors duration-200"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Completing...
              </>
            ) : (
              "Complete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}