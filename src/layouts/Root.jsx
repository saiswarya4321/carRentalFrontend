import { Outlet } from "react-router-dom";
import UserHeader from "../components/Userheader";
import Footer from "../pages/shared/Footer";

const Root = () => (
  <>
    <UserHeader />
    <Outlet />
    <Footer/>
  </>
);

export default Root;
