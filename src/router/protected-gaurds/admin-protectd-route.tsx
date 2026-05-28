import { useSelector } from "react-redux";
import { RootState } from "../../feature/store";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export const AdminPublicProtectedRoute = ({ children }: Props) => {
  const { isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.adminAuth,
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
    return <Navigate to="/admin/dashboard/login" replace />;
  }

  return <>{children}</>;
};
