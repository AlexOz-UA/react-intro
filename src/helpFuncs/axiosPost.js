import axios from 'axios'

export default function axiosPost (url, data) {
    axios.post(url, {
        data
    })
    .then((response) => {
        console.log(data)
      return JSON.stringify(response);
    })
    .catch((error) => {
      alert("Error:", error);
    });
}