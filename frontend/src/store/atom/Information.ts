import { atom } from "recoil";

export const infoAtom = atom({
  key: "info",
  default: { email: "Unknown", name: "Unknown", id: "Unknown" },
});

export const themeAtom = atom({
  key: "theme",
  default: localStorage.getItem("theme") || "dark",
});
