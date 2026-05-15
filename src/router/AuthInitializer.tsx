import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  verifySellerAuth,
  verifyBuyerAuth,
} from "../feature/authSlice/authThunks";
import type { AppDispatch, RootState } from "../feature/store";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading: isLoadingSeller } = useSelector(
    (state: RootState) => state.sellerAuth,
  );
  const { isLoading: isLoadingBuyer } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    const sellerToken = localStorage.getItem("sellerAccessToken");
    const buyerToken = localStorage.getItem("buyerAccessToken");

    if (sellerToken) {
      dispatch(verifySellerAuth());
    }

    if (buyerToken) {
      dispatch(verifyBuyerAuth());
    }
  }, [dispatch]);

  if (isLoadingSeller && isLoadingBuyer) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
