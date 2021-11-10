import { useState, useEffect } from "react";
import APIServices from "src/apiUtils/APIServices";

const useEnglishTest = (_) => {
  const [englishTest, setEnglishTest] = useState(
    typeof window !== "undefined" &&
      !!window.localStorage.getItem("englishTests")
      ? JSON.parse(window.localStorage.getItem("englishTests"))
      : [] || []
  );
  const fetchTests = async (_) => {
    const { data, success } = await new APIServices(
      "core/course/english/"
    ).get();
    if (success) {
      setEnglishTest(data?.data);
      if (!!window) {
        window.localStorage.setItem("englishTests", JSON.stringify(data?.data));
      }
    }
  };
  useEffect(() => {
    if (!englishTest?.length && window.localStorage.getItem("token") !== null)
      fetchTests();
  }, []);

  return englishTest;
};

export default useEnglishTest;
