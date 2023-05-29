import axios from 'axios'

export default function axiosPost (url, data) {
    axios.post(url, {
        data
    })
    .then((response) => {
      return JSON.stringify(response);
    })
    .catch((error) => {
      alert("Error:", error);
    });
}