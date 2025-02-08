import { atom } from "recoil";

export const infoAtom = atom({
  key: "info",
  default: { email: "Unknown", name: "Unknown", id: "Unknown" },
});
