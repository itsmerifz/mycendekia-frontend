import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: "",
    name: "",
    email: "",
    image: "",
  },
});

export const tokenState = atom({
  key: "tokenState",
  default: "",
});
