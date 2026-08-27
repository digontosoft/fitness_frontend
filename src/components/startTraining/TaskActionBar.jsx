import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const TaskActionBar = ({
  onComplete,
  isSubmitting,
  disabled,
  draftStatus,
}) => {
  const autosaveLabel =
    draftStatus === "saving"
      ? "שומר שינויים..."
      : "כל השינויים נשמרים אוטומטית";

  return (
    <div dir="rtl" className="mt-6 pt-5">
      <div className="flex flex-col items-center gap-3">
        <Button
          type="button"
          onClick={onComplete}
          disabled={disabled || isSubmitting}
          className="w-full sm:w-auto bg-[#7994CB] hover:bg-[#6a84bb] text-white font-bold text-sm px-10 h-12 rounded-xl min-w-[200px] disabled:opacity-45 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "סיום אימון"
          )}
        </Button>

        {/* {disabled && (
          <p className="text-xs text-[#7F7F7F] text-center">
            יש להשלים את כל התרגילים כדי לסיים
          </p>
        )} */}

        {/* <div className="flex items-center gap-2 text-sm text-[#5B6B7C]">
          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>{autosaveLabel}</span>
        </div> */}
      </div>
    </div>
  );
};

export default TaskActionBar;
