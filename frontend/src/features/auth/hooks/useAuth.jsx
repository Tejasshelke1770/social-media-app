import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
