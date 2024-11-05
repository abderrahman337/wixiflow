import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
interface User {
  id: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState<AuthContextType>({
    isAuthenticated: false,
    user: null,
  });

  const logout = () => {
    // Implement your logout logic here
    setAuthState({ isAuthenticated: false, user: null });
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const decoded = jwtDecode(refreshToken);
      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        logout();
        navigate("/login");
      } else {
        setAuthState({ isAuthenticated: true, user: decoded as User });
      }
    } else {
      navigate("/");
    }
  }, []);

  const value = {
    ...authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth };
export default AuthProvider;
