import axios from "axios";

const axiosGet = async (url, headers) => {
  try {
    const response = await axios.get(url, headers);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default axiosGet;