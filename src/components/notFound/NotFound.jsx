import { UI_TEXT } from "@/constants/hebrewText";
import { Link } from "react-router-dom";
import nofFound from "../../assets/image/notFound.png";
const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src={nofFound} alt={UI_TEXT.pageNotFound} className="not-found-image" />
      <div className="not-found-content">
        <Link to={"/"} className="back-to-home-button">
          {UI_TEXT.backToHome}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
