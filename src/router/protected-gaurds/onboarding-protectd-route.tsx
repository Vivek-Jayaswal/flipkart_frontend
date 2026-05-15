import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../../types/store/store";

export default function SellerOnboardingProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated, isSellerProfileCompleted } = useSelector(
    (state: RootState) => state.sellerAuth,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // not logged in
  if (!isAuthenticated) {
    return <Navigate to="/seller/signup" />;
  }

  // already completed onboarding
  if (isSellerProfileCompleted) {
    return <Navigate to="/seller/dashboard/home" />;
  }

  return <>{children}</>;
}
