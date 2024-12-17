import axios from "axios";

const apiAxios = axios.create({
  baseURL: "http://localhost:8082",
});

export const testUserServivePrivateApi = async (token) => {
  const response = await apiAxios.get("/user/private/test", {
    headers: {
      Authorization: `Bearer ${token}`, // Pass token here
    },
  });
  return response.data; // Return response data
};
