import { resolve } from "path";

export const root = resolve(import.meta.dirname, "..", "..");


//path to public folder
export const publicDir = resolve(root, "./public");
