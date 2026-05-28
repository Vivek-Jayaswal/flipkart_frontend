import { Outlet } from "react-router-dom";
import { NavBar } from "../components/navbar/navbar";
import Footer from "../components/footer/buyer-footer";

export const Layout = () => {
  return (
    <div className="box-border h-screen overflow-auto w-[80vw] m-auto">
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};
