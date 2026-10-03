import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;

  user: any | null;

  login: (token: string, userData?: any) => void;
  logout: () => void;

  UserRegistered: boolean;
  setUserRegistered: (registered: boolean) => void;

  // Welcome Loader
  loaderExit: boolean;
  setLoaderExit: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {



  const [UserRegistered, setUserRegistered] = useState(false);
  const [loaderExit, setLoaderExit] = useState(true);
 

  const [token, setTokenState] = useState<string | null>(() => {return localStorage.getItem("token");});
  const [user, setUser] = useState<any | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });






  const login = (newToken: string, userData?: any) => {
    setTokenState(newToken);

    localStorage.setItem("token", newToken);

    if (userData) {
      setUser(userData);

      localStorage.setItem("user", JSON.stringify(userData));
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  const logout = () => {
    setTokenState(null);
    setUser(null);
   
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete axios.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);







  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: setTokenState,
        user,
        login,
        logout,
        UserRegistered,
        setUserRegistered,
        loaderExit,
        setLoaderExit,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}