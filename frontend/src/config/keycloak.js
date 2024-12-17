import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:9080", // Keycloak server URL
  realm: "MetaHive", // Realm name
  clientId: "authClient", // Client ID registered in Keycloak
});

export default keycloak;
