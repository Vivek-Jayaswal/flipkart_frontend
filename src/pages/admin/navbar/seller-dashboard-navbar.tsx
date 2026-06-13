import { User } from "lucide-react";
import { useState } from "react";
// import { Button } from "../../reusable/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../feature/store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { userLogout } from "../../../services/mutation/login";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../feature/authSlice/sellerAuthSlice";
import { Button } from "../../../shared/reusable/button";

const SellerProfile = () => {
  const { data } = useSelector((state: RootState) => state.sellerAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: async (d: { role: string }) => {
      return await userLogout(d);
    },
    onSuccess: () => {
      toast.success("Logout Successfully");
      dispatch(logout());
      navigate("/seller/signup");
    },
  });

  const handleLogout = () => {
    mutate({ role: "selleer" });
  };

  return (
    <div className="rounded-2xl shadow-md border border-gray-300 bg-white text-start text-gray-900">
      <div className="flex items-center border-b border-gray-300 gap-2 p-4 pb-2">
        <div className="p-2 rounded-full border border-gray-300">
          <User size={18} />
        </div>
        <div className="text-start text-gray-900 ">
          <p className="text-sm font-semibold">{data.name || "NA"}</p>
          <p className="text-xs opacity-80">{data.gmail || "NA"}</p>
        </div>
      </div>
      <div className="p-4">
        <Button
          size="small"
          variant="outline"
          className="w-full"
          onClick={handleLogout}
          disabled={isPending}
        >
          {isPending ? "Logging out...." : "Logout"}
        </Button>
      </div>
    </div>
  );
};

export const SellerDashboardNavbar = () => {
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false);
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-blue-600 px-8 py-4 text-white">
      <div>
        <h2 className="text-2xl font-bold">Welcome back, Seller Name 👋</h2>
        <p className="text-sm opacity-90">
          Here's what's happening with your business today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
          Download App
        </button>

        <Button
          onMouseEnter={() => setIsShowProfile(true)}
          onMouseLeave={() => setIsShowProfile(false)}
          className="flex items-center gap-3 rounded-full bg-white/10 p-4 relative"
        >
          <User size={14} />

          {isShowProfile && (
            <div className="absolute top-12 -left-44">
              <SellerProfile />
            </div>
          )}
        </Button>
      </div>
    </header>
  );
};
