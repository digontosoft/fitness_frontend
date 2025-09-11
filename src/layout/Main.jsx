import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import ScrollTop from "@/shared/ScrollTop";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="font-hebbo">
      <ScrollTop />  
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Main;
