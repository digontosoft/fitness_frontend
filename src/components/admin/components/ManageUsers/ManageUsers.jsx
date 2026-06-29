import { UI_TEXT } from "@/constants/hebrewText";
import NotFound from "@/shared/NotFound";
import UserSearch from "../usersearch/UserSearch";
import BasicButton from "../ui/BasicButton";
import MoveIcon from "@/assets/icons/Icon";
import { Link } from "react-router-dom";
import FormTitle from "@/components/admin/components/ui/FormTitle";

const ManageUsers = () => {
  return (
    <div className="min-h-[72vh] h-auto grid gap-5">
      <div className="space-y-5">
        <FormTitle title="ניהול משתמשים" />
        <UserSearch />
        <NotFound title={UI_TEXT.noDataFound} />
      </div>
      <Link to="/dashboard/" className="self-end">
        <BasicButton
          title={UI_TEXT.backToDashboard}
          icon={<MoveIcon className="w-10 h-10" />}
        />
      </Link>
    </div>
  );
};

export default ManageUsers;
