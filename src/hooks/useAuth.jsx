import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

const defaultUser = {
  id: 1,
  name: "Aarav Sharma",
  email: "aarav@example.com",
  role: "user",
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("assessly-user", null);

  const value = useMemo(
    () => ({
      user,
      login(role = "user") {
        setUser({
          ...defaultUser,
          role,
          name: role === "admin" ? "Olivia Carter" : defaultUser.name,
          email: role === "admin" ? "admin@assessly.io" : defaultUser.email,
        });
      },
      logout() {
        setUser(null);
      },
      signup(payload) {
        setUser({
          id: Date.now(),
          role: "user",
          ...payload,
        });
      },
    }),
    [setUser, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
