import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../feature/store";

export function SellerProtectedRoute({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { isLoading, isAuthenticated, isSellerProfileCompleted } = useSelector(
    (state: RootState) => state.sellerAuth,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/seller/signup" />;
  }

  if (!isSellerProfileCompleted) {
    return <Navigate to="/seller/onboarding" />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export function PublicSellerRoute({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { isLoading, isAuthenticated, isSellerProfileCompleted } = useSelector(
    (state: RootState) => state.sellerAuth,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return children ? <>{children}</> : <Outlet />;
  }

  if (!isSellerProfileCompleted) {
    return <Navigate to="/seller/onboarding" />;
  }

  return <Navigate to="/seller/dashboard/home" />;
}
