import axios from "axios";

const httpClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      "An error occurred while processing the request.";

    return Promise.reject(new Error(message));
  },
);

export { httpClient };
