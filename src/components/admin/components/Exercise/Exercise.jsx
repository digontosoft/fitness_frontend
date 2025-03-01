import NotFound from "@/shared/NotFound";
import { Link } from "react-router-dom";
import BasicButton from "../ui/BasicButton";
import MoveIcon from "@/assets/icons/Icon";
import BasicCard from "../ui/BasicCard";
import FormTitle from "@/components/admin/components/ui/FormTitle";

const Exercise = () => {
  return (
    <div className="min-h-[72vh] h-auto grid gap-5">
      <div className="space-y-5">
        <FormTitle title="Manage Exercise" />
        <div>
          <Link to="/dashboard/add-exercise">
            <BasicCard>
              <span>Add Exercise</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-square-arrow-left"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="m12 8-4 4 4 4" />
                <path d="M16 12H8" />
              </svg>
            </BasicCard>
          </Link>
        </div>
        <NotFound title="No Data Found" />
      </div>
      <Link to="/dashboard/" className="self-end">
        <BasicButton
          title="Back To Dashboard"
          icon={<MoveIcon className="w-10 h-10" />}
        />
      </Link>
    </div>
  );
};

export default Exercise;
