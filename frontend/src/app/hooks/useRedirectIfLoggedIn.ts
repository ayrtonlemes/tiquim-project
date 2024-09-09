import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthContext from "./useAuthContext";

const useRedirectIfLoggedIn = () => {
  const router = useRouter();
  const { id } = useAuthContext();

  useEffect(() => {
    if (id) {
      router.push("/");
    }
  }, [id, router]);

  return id !== "";
};

export default useRedirectIfLoggedIn;
