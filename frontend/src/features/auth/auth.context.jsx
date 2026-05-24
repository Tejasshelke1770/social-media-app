import { createContext, useState } from "react";
import { login, register } from "./services/auth.api";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await login(email, password);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await register(username, email, password);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loading, user, handleLogin, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
