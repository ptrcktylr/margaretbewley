export const getInitialTheme = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isdark") === "true" ? "dark" : "light";
  }
  return "light";
};
