import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3911/api/",
  headers: {
    "Content-Type": "application/json",
  },
})