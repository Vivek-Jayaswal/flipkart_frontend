import { Outlet } from "react-router-dom";
import { SellerDashboardSideBar } from "../components/navbar/seller-navbar/seller-dashboard-sidebar";
import { SellerDashboardNavbar } from "../components/navbar/seller-navbar/seller-dashboard-navbar";

const SellerDashboardLayout = () => {
  return (
    <div className="box-border h-screen grid grid-cols-[1fr_5fr]">
      <div className="overflow-auto">
        <SellerDashboardSideBar />
      </div>
      <div className="overflow-auto">
        <div className="sticky top-0 z-[999]">
          <SellerDashboardNavbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SellerDashboardLayout;
