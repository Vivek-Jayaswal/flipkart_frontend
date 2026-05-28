import { Outlet } from "react-router-dom";
// import { NavBar } from "../components/navbar/navbar";

export const AdminLayout = () => {
  return (
    <div className="box-border h-screen overflow-auto w-[80vw] m-auto">
      {/* <NavBar /> */}
      <div className="w-full h-16 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
      <Outlet />
    </div>
  );
};
