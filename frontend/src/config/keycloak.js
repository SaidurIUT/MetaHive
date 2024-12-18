// src/config/keycloak.js
import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:9080",
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "MetaHive",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "authClient",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
