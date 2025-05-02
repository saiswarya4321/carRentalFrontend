import { Outlet } from "react-router-dom";
import DealerHeader from "../components/Dealerheader";
import Footer from "../pages/shared/Footer";

const Dealerlayout = () => (
  <>
    <DealerHeader />
    <Outlet />
    <Footer/>
  </>
);

export default Dealerlayout;
