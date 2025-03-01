import React from "react";
import { Link } from "react-router-dom";
import BasicCard from "../ui/BasicCard";
import NotFound from "@/shared/NotFound";
import BackDashBoardButton from "@/shared/BackDashBoardButton";
import FormTitle from "@/components/admin/components/ui/FormTitle";

const NutritionGuides = () => {
  return (
    <div className="min-h-[72vh] h-auto grid gap-5">
      <div className="space-y-5">
        <FormTitle title="Manage Nutrition Guides" />
        <div>
          <Link to="/dashboard/add-nutrition-guide">
            <BasicCard>
              <span>Add Nutrition Guides</span>
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
      <BackDashBoardButton />
    </div>
  );
};

export default NutritionGuides;
