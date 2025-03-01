import { Link } from "react-router-dom";
import nofFound from "../../assets/image/notFound.png";
const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src={nofFound} alt="Page Not Found" className="not-found-image" />
      <div className="not-found-content">
        <Link to={"/"} className="back-to-home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
