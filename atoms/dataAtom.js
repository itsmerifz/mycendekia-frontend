import { atom } from "recoil";

export const articlesState = atom({
  key: "articlesState",
  default: [],
})

export const idArticleState = atom({
  key: "idArticleState",
  default: '',
})