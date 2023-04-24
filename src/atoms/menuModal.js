import { atom } from "recoil";

export const menuModalState = atom({
    key: "menuModalState",
    default: {
        open: false,
    }
})