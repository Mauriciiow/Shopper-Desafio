import { getToken, setToken, getUserId, setUserId } from "@/helper/auth";
import React, { createContext, useContext, useState } from "react";

export interface AuthContextProps {
  authenticated: boolean;
  userId: string;
  setAuth: (token: string, id: string) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const hasToken = getToken();
  const hasUserId = getUserId();
  const [authenticated, setAuthenticated] = useState<boolean>(
    Boolean(hasToken)
  );
  const [id, setId] = useState<string>(hasUserId || "");

  const setAuth = (token: string, id: string) => {
    setToken(token);
    setUserId(id);
    setAuthenticated(Boolean(token));
    setId(id);
  };
  return (
    <AuthContext.Provider value={{ authenticated, userId: id, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
