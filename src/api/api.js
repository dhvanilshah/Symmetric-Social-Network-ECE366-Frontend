import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:9999/`
  // baseURL: `http://192.168.1.90:9999`
});
