const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://cgpa-analyzer.onrender.com";

const apiClient = async (url, options = {}) => {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

  const defaultOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("authToken")
        ? { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
        : {}),
      ...options.headers,
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(fullUrl, config);

    if (response.status === 401) {
      localStorage.removeItem("isAuthenticated");
      // Prevent infinite loop: Only redirect if not already on login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      throw new Error("Unauthorized");
    }

    return response;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("API request failed:", error);
    }
    throw error;
  }
};

// Helper to get full backend URL for redirects (like Google OAuth)
export const getBackendUrl = (path) => {
  return `${API_BASE_URL}${path}`;
};

export default apiClient;
