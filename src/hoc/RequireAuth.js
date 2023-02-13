import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("foodClubUserId")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
