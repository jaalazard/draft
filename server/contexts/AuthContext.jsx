import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthProviderContext = createContext();

export function AuthProvider({ children, ...props }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const res = await fetch("http://localhost:5000/check", {
        credentials: "include",
        signal: abortController.signal,
      });
      const data = await res.json();
      console.log(data);
      setIsLoggedIn(data.isLoggedIn);
    })();
    return () => {
      abortController.abort();
    };
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn, setIsLoggedIn,
    }),
    [isLoggedIn, setIsLoggedIn]
  );

  return (
    <AuthProviderContext.Provider value={value} {...props}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};