import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/folder");
    }
  }, [router]);

  // useEffect(() => {
  //     if (!user?.email && !test_mode) {
  //         navigate("/auth");
  //     }
  // }, [user?.email]);
};
