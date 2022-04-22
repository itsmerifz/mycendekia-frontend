import axios from "axios";

export default axios.create({
  baseURL: "http://103.176.79.105:3911/api/",
  headers: {
    "Content-Type": "application/json",
  },
})