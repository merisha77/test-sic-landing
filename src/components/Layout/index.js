import React, { useEffect } from "react";

// Layout Components
import dynamic from "next/dynamic";
const Topbar = dynamic(()=> import("./Topbar"));
//import Topbar from "./Topbar";
const Footer = dynamic(()=> import("./Footer"));

//import Footer from "./Footer";
const Drawers = dynamic(()=> import("../drawer"));

//import Drawers from "../drawer";

const Layout = ({ children }) => {
  useEffect(() => {
    document.body.classList = "";
    window.addEventListener("scroll", scrollNavigation, true);
    return () => {
      // Make sure to remove the DOM listener when the component is unmounted.
      window.removeEventListener("scroll", scrollNavigation);
    };
  }, []);

  const scrollNavigation = () => {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const topNav = document.getElementById("topnav");
    if (top > 80) {
      !!topNav && topNav.classList.add("nav-sticky");
    } else {
      !!topNav && topNav.classList.remove("nav-sticky");
    }
  };
  return (
    <React.Fragment>
      <Topbar />
      {children}
      <Footer />
      <Drawers />
    </React.Fragment>
  );
};
export default Layout;
