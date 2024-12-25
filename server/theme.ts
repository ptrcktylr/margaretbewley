import { cookies } from "next/headers";

export const getInitialTheme = async (): Promise<string> => {
  const cookieStore = await cookies(); // Await the cookies() function itself
  const cookie = cookieStore.get("isdark");
  const isDark = cookie?.value;

  return isDark === "true" ? "dark" : "light";
};
