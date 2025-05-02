import { Navigate } from "react-router-dom";

function VendorRoute({ children }) {
  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "vendor") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default VendorRoute;
