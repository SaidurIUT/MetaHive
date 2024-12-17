import { publicAxios, privateAxios } from "../helper";

export const testUserServivePublicApi = async () => {
  try {
    const response = await publicAxios.get("/user/public/test");
    console.log(
      "This is the response of testUserServicePublicUri :" + response.data
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const testUserServivePrivateApi = async () => {
  try {
    const response = await privateAxios.get("/user/private/test");
    console.log(
      "This is the response of testUserServicePrivateApi :" + response.data
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
