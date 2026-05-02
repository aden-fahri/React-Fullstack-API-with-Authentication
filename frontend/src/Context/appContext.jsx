import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const res = await fetch("/api/user", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error("Network error", err);
    }
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getUser();
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}