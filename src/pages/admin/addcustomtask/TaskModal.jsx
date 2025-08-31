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

const TaskModal = ({ open, setOpen }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      type: e.target.type.value,
    };
    console.log("Form Submitted:", data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95%] max-w-lg sm:max-w-xl md:max-w-2xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold sm:text-xl">
            Add New Task
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6"
        >
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter task title"
              required
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter task description"
              rows={4}
              className="w-full"
            />
          </div>

          {/* Select */}
          <div className="space-y-2">
            <Label htmlFor="type">Task Type</Label>
            <Select name="type">
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: "personal", label: "Once" },
                  { value: "work", label: "Daily" },
                  { value: "home", label: "Weekly" },
                  { value: "weekOne", label: "One Week" },
                  { value: "weekTwo", label: "Two Weeks" },
                  { value: "monthOne", label: "One Month" },
                  { value: "monthTwo", label: "Two Months" },
                  { value: "monthThree", label: "Three Months" },
                ].map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-md px-2"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Footer */}
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
