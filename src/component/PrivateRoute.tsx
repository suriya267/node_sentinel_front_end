import { Navigate } from "react-router-dom";
import { getToken } from "../utils/sessionStorage";

const PrivateRoute = ({ children }: any) => {
  
  console.log("getToken()", getToken());

  return getToken() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
