import { Outlet } from "react-router-dom";
import { NavBar } from "../components/navbar/navbar";

export const Layout = () => {
  return (
    <div className="box-border h-screen overflow-auto w-[80vw] m-auto">
      <NavBar />
      <Outlet />
      {/* <h1 className="w-full border p-2">footer</h1> */}
    </div>
  );
};
