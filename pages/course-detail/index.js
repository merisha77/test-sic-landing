import { useRouter } from "next/router";
import { useEffect } from "react";

const index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/404");
  }, []);

  return null;
};

export default index;
