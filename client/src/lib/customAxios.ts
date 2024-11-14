import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const backend_url: string = import.meta.env.VITE_BACKEND_URL;

console.log("backend_url==>", backend_url);
const axiosInstance = axios.create({
  baseURL: backend_url,
});

// Interceptor for requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor for responses
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    if (
      error.response &&
      error.response.status === 401 &&
      !("_retry" in originalRequest)
    ) {
      (
        originalRequest as InternalAxiosRequestConfig & { _retry: boolean }
      )._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return;
        const refreshResponse: AxiosResponse = await axios.post(
          `${backend_url}/api/auth/refresh-token`,
          {
            refreshToken,
          }
        );
        const newAccessToken: string = refreshResponse.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = newAccessToken;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., log the user out)
        console.error("Refresh token failed:", refreshError);
        // Optionally clear localStorage and redirect to login
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("refreshToken");
        // // Redirect to login or show a message to the user
      }
    }
    return Promise.reject(error); // Ensure to return a rejected promise for other errors
  }
);

export default axiosInstance;
