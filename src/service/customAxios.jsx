import axios from "axios";
// import history from "history";
export const API = "https://dai.tongdaihoidap.com";

const instance = axios.create({
  baseURL: `${API}/v1/api`,
});

// instance.interceptors.request.use(

//   function (config) {
//     config.headers["x-xclient-id"] = localStorage.getItem("userID");
//     config.headers["authorization"] = localStorage.getItem("token");
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );
instance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    request.headers["x-xclient-id"] = localStorage.getItem("userID");
    request.headers["authorization"] = localStorage.getItem("token");
  } else {
    // logout()
    localStorage.removeItem("accessToken");
    // history.push("/auth/login");
    window.location.href = "/login";
  }
  return request;
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
