"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../config/authContext";
import {
  testUserServivePrivateApi,
  testUserServivePublicApi,
} from "../services/userService/testUserServiceApi";

export default function Home() {
  const { isAuthenticated, login, keycloak } = useAuth();
  const [loadData, setLoadData] = useState(null); // State to hold API result
  const [error, setError] = useState(null); // State to hold errors if API fails
  const [loadDataPublic, setLoadDataPublic] = useState(null);

  useEffect(() => {
    if (isAuthenticated && keycloak?.token) {
      loadTestPrivate();
    }
  }, [isAuthenticated, keycloak]);

  useEffect(() => {
    if (isAuthenticated && keycloak?.token) {
      loadTestPublic();
    }
  }, [isAuthenticated, keycloak]);

  // Function to load data from the private API
  const loadTestPrivate = async () => {
    try {
      if (!keycloak?.token) {
        console.error("No token available");
        return;
      }

      const response = await testUserServivePrivateApi();
      console.log(
        "API Call Successful , response from app/page.js: ",
        response
      );
      setLoadData(response);
    } catch (err) {
      console.error("Comprehensive Private API Error:", {
        name: err.name,
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        headers: err.response?.headers,
      });
      setError(`Failed to fetch data: ${err.message}`);
    } finally {
      console.groupEnd();
    }
  };

  // Function to load data from the public API
  const loadTestPublic = async () => {
    try {
      const response = await testUserServivePublicApi();
      setLoadDataPublic(response);
    } catch (err) {
      console.error("Comprehensive Error:", {
        name: err.name,
        message: err.message,
        response: err.response,
        request: err.request,
        config: err.config,
      });
      setError("Failed to fetch data");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>You are not logged in</h1>
        <button
          onClick={login}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    );
  }

  const userName = keycloak?.tokenParsed?.name || "User";

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Congratulations! You are logged in to MetaHive 🎉</h1>
      <p style={{ fontSize: "20px", marginTop: "10px" }}>
        Welcome, <strong>{userName}</strong>!
      </p>
      <p>
        Your Token is: <br />
        <code style={{ wordWrap: "break-word" }}>{keycloak?.token}</code>
      </p>
      <p>
        Your Token is: <br />
        <code style={{ wordWrap: "break-word" }}>{keycloak?.token}</code>
      </p>
      <p>
        Your Token is: <br />
        <code style={{ wordWrap: "break-word" }}>{keycloak?.token}</code>
      </p>
      <p>
        Your Token is: <br />
        <code style={{ wordWrap: "break-word" }}>{keycloak?.token}</code>
      </p>
      <p>
        Your Token is: <br />
        <code style={{ wordWrap: "break-word" }}>{keycloak?.token}</code>
      </p>
      <p>
        Your Token is: <br />
        <code style={{ wordWrap: "break-word" }}>{keycloak?.token}</code>
      </p>
      <p>
        {loadData ? (
          <>
            <strong>Private API Response:</strong> {JSON.stringify(loadData)}
          </>
        ) : (
          "Loading data from private API..."
        )}
      </p>
      <p>
        {loadDataPublic ? (
          <>
            <strong>Public API Response:</strong>{" "}
            {JSON.stringify(loadDataPublic)}
          </>
        ) : (
          "Loading data from public API..."
        )}
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={() => keycloak?.logout()}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#ff0000",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Log Out
      </button>
    </div>
  );
}
