import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const [user, setUser] = useState(() => ({
    userId: localStorage.getItem("userId"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
  }));

  // =========================
  // LOGIN
  // =========================

  const login = (authData) => {
    const {
      token: newToken,
      userId,
      name,
      email,
      role,
    } = authData;

    localStorage.setItem("token", newToken);

    if (userId) {
      localStorage.setItem("userId", userId);
    }

    if (name) {
      localStorage.setItem("name", name);
    }

    if (email) {
      localStorage.setItem("email", email);
    }

    if (role) {
      localStorage.setItem("role", role);
    }

    setToken(newToken);

    setUser({
      userId: userId ?? null,
      name: name ?? null,
      email: email ?? null,
      role: role ?? null,
    });
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    setToken(null);

    setUser({
      userId: null,
      name: null,
      email: null,
      role: null,
    });
  };

  // =========================
  // AUTH STATE
  // =========================

  const isAuthenticated = Boolean(token);

  const isAdmin =
    isAuthenticated && user.role === "ADMIN";

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      isAdmin,
      login,
      logout,
    }),
    [token, user, isAuthenticated, isAdmin]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// =========================
// CUSTOM HOOK
// =========================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}

export default AuthContext;