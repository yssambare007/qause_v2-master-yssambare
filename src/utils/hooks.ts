import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TOKEN } from "../constants/constants";

export const useAuthRedirect = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem(TOKEN) == null) {
      setIsAuthenticated(false);
      router.push("/ngo-login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);
  return isAuthenticated;
};
