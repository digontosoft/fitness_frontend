import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="font-hebbo">
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Main;
