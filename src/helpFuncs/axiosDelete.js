import axios from "axios";

export default function axiosDelete(url) {
  axios.delete(url)
      .then((response) => {
        return JSON.stringify(response);
      })
      .catch((error) => {
        alert("Error:", error);
      });
}