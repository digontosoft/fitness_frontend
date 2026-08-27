const TaskProgressSummary = ({ filledCount, totalCount }) => {
  if (totalCount <= 0) return null;

  return (
    <div
      className="inline-flex items-center rounded-full bg-[#E8EEF8] border border-[#D5DEF0] px-4 py-1.5"
      dir="rtl"
    >
      <span className="text-sm font-semibold text-[#7994CB]">
        {filledCount} מתוך {totalCount} תרגילים הושלמו
      </span>
    </div>
  );
};

export default TaskProgressSummary;
