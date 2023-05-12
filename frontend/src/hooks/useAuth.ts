import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const router = useRouter();
  const userState = useAppSelector((state) => state.user);
  const { user, token } = userState;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user || !token) {
      router.push('/login', undefined, {
        shallow: true
      });
    } else {
      setLoading(false);
    }
  }, [router, token]);

  return { loading, user, token };
};