import React, { memo } from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
//import DrawerLogin from "./DrawerLogin";
const DrawerLogin =dynamic(()=>import("./DrawerLogin")) ;

//import DrawerSignUp from "./DrawerSignUp";
const DrawerSignUp =dynamic(()=>import("./DrawerSignUp")) ;

import { valueChanged } from "src/actions/userActions";
const DrawerCompareList =dynamic(()=>import("./DrawerCompareList")) ;
import useWidth from "src/utilities/widthUtil";

const Drawers = memo((_) => {
  const dispatch = useDispatch();
  const activeDrawer = useSelector((state) => state.user.get("activeDrawer"));
  const { drawerKey, title, isVisible } = !!activeDrawer && activeDrawer;

  const getContent = (_) => {
    switch (drawerKey) {
      case "login":
        return <DrawerLogin />;
      case "signup":
        return <DrawerSignUp />;
      case "compareCourse":
        return <DrawerCompareList />;
      default:
        return "";
    }
  };

  const onClose = (_) => {
    dispatch(valueChanged(`activeDrawer.isVisible`, false));
  };
  const { isMobile, isTablet } = useWidth();

  return (
    <Drawer
      width={isMobile ? "100%" : isTablet ? "80%" : "40%"}
      style={{ zIndex: 1040 }}
      title={title}
      closable={true}
      onClose={onClose}
      visible={isVisible}
      placement={"right"}
    >
      {getContent()}
    </Drawer>
  );
});

export default Drawers;
