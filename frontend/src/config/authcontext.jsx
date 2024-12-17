"use client";

import toast from "react-hot-toast";
import keycloak from "./keycloak";
import { createContext, useContext, useState, useEffect } from "react";

// Creating auth context
const AuthContext = createContext();

// AuthProvider to manage Keycloak authentication
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keycloakObject, setKeycloakObject] = useState(null);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "check-sso", // Check for existing session
        pkceMethod: "S256",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        setKeycloakObject(keycloak); // Pass the keycloak instance
        if (authenticated) {
          toast.success("Login successful!");
        }
        console.log("Keycloak initialized:", keycloak.authenticated);
        console.log("Keycloak Object:", keycloak);
      })
      .catch((error) => {
        console.error("Keycloak initialization failed:", error);
        toast.error("Login failed!");
      });
  }, []);

  const login = () => {
    keycloak.login(); // Redirect to Keycloak login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, keycloak: keycloakObject }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext
export const useAuth = () => useContext(AuthContext);
