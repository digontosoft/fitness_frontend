import MoveIcon from "@/assets/icons/Icon";
import BasicButton from "@/components/admin/components/ui/BasicButton";
import { Link } from "react-router-dom";

const BackDashBoardButton = ({ className }) => {
  return (
    <Link to="/dashboard/">
      <BasicButton
        className={className}
        title="Back To Dashboard"
        icon={<MoveIcon className="w-10 h-10" />}
      />
    </Link>
  );
};

export default BackDashBoardButton;
