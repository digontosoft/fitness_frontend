import MoveIcon from "@/assets/icons/Icon";
import BasicButton from "@/components/admin/components/ui/BasicButton";
import { UI_TEXT } from "@/constants/hebrewText";
import { Link } from "react-router-dom";

const BackDashBoardButton = ({ className }) => {
  return (
    <Link to="/dashboard/">
      <BasicButton
        className={className}
        title={UI_TEXT.backToDashboard}
        icon={<MoveIcon className="w-10 h-10" />}
      />
    </Link>
  );
};

export default BackDashBoardButton;
