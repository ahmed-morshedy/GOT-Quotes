import axios from "axios";

// Define the base URL for the API
const API_BASE_URL = "https://api.gameofthronesquotes.xyz/v1";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // optional: specify a timeout (10 seconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to perform a GET request
export const fetchData = async <T,>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data; // Return the data from the response
  } catch (error: any) {
    console.error(`Error fetching data from ${endpoint}:`, error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};
