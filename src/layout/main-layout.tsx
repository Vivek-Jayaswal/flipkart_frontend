import { Outlet } from "react-router-dom";
import { NavBar } from "../components/navbar/navbar";
import Footer from "../components/footer/buyer-footer";

export const Layout = () => {
  return (
    <div className="box-border h-screen overflow-auto m-auto">
      <div className="w-[80%] m-auto">
        <NavBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
