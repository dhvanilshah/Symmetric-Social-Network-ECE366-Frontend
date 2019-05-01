import axios from "axios";

const token = async () => {
  return await localStorage.getItem("session-token");
};

export default axios.create({
  // baseURL: `http://localhost:8080`,
  baseURL: `http://192.168.1.90:8080`,
  headers: { "session-token": localStorage.getItem("token") }
});
