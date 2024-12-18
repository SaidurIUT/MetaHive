//src/config/authContext.jsx

"use client";

import toast from "react-hot-toast";
import keycloak from "./keycloak";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keycloakObject, setKeycloakObject] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        // Check if there's a valid session
        const authenticated = await keycloak.init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri:
            window.location.origin + "/silent-check-sso.html",
          pkceMethod: "S256",
          checkLoginIframe: false, // Disable login iframe checking
          enableLogging: process.env.NODE_ENV === "development",
        });

        setIsAuthenticated(authenticated);
        setKeycloakObject(keycloak);
        setIsInitialized(true);

        if (authenticated) {
          // Setup token refresh mechanism
          keycloak.onTokenExpired = async () => {
            try {
              const refreshed = await keycloak.updateToken(70);
              if (refreshed) {
                localStorage.setItem("authToken", keycloak.token || "");
              } else {
                throw new Error("Token refresh failed");
              }
            } catch (error) {
              console.error("Failed to refresh token", error);
              logout();
            }
          };

          // Store token in localStorage
          localStorage.setItem("authToken", keycloak.token || "");
        }
      } catch (error) {
        console.error("Keycloak initialization error:", error);
        toast.error("Authentication initialization failed");
        setIsInitialized(true);
      }
    };

    initKeycloak();
  }, []);

  const login = () => {
    keycloak.login({
      redirectUri: window.location.origin,
    });
  };

  const logout = () => {
    keycloak.logout({
      redirectUri: window.location.origin,
    });
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  const getCurrentUserName = () => {
    return keycloak.tokenParsed?.preferred_username || null;
  };

  const getUserId = () => {
    return keycloak.tokenParsed?.sub || null;
  };

  const getUserRoles = () => {
    return keycloak.tokenParsed?.realm_access?.roles || [];
  };

  const getToken = () => {
    return keycloak.token || null;
  };

  const hasRole = (role) => {
    return getUserRoles().includes(role);
  };

  const isTokenExpired = () => {
    return !keycloak.token || keycloak.isTokenExpired();
  };

  // Don't render children until Keycloak is initialized
  if (!isInitialized) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        getCurrentUserName,
        getUserId,
        getUserRoles,
        getToken,
        hasRole,
        isTokenExpired,
        keycloak: keycloakObject,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
