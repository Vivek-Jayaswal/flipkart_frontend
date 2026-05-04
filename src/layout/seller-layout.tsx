import { Outlet } from "react-router-dom";
import SellerNavbar from "../components/navbar/seller-navbar/seller-navbar";

const SellerLayout = () => {
  return (
    <div className="box-border h-screen overflow-auto w-[90vw] m-auto">
      <SellerNavbar />
      <Outlet />
    </div>
  );
};

export default SellerLayout;
