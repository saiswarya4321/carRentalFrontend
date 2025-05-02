import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Adminheader";
import Footer from "../pages/shared/Footer";

const Adminlayout = () => (
  <>
    <AdminHeader />
    <Outlet />
    <Footer/>
    
  </>
);

export default Adminlayout;