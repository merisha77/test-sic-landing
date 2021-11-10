import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Menu, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

import { fetchAdvertisement } from "src/actions/userActions";
import Link from "next/link";
import { useRouter } from "next/router";

const Topbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const creds = useSelector((state) => state.auth?.get("creds"));

  const [state, setState] = useState({
    isOpen: false,
    page: false,
    landing: false,
    docs: false,
    new: false,
    utility: false,
    user: false,
    work: false,
    blog: false,
    carr: false,
    showInqueryForm: false
  });

  const toggleLine = () => setState({ ...state, isOpen: !state?.isOpen });

  useEffect(() => {
    if (router.pathname === "/search/") dispatch(fetchAdvertisement());
  }, []);

  const isLoggedIn = (_) => {
    if (Boolean(creds?.isLoggedIn)) return true;
    if (typeof window !== "undefined") {
      if (Boolean(window.localStorage.getItem("token"))) return true;
      return false;
    } else {
      return false;
    }
  };

  const onLogout = (_) => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = "/";
  };

  const menu = (
    <Menu className="nav-logout">
      <Menu.Item key="0">
        <Link href="/account"  prefetch={false}>
          <a>
            <UserOutlined />
            &nbsp; Profile
          </a>
        </Link>
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item key="1">
        <span onClick={onLogout}>
          <LogoutOutlined /> &nbsp;Logout
        </span>
      </Menu.Item>
    </Menu>
  );

  let user = {};
  if (typeof window !== "undefined")
    user =
      !!window.localStorage?.getItem("user") &&
      JSON.parse(window.localStorage?.getItem("user"));

  useEffect(() => {
    state.isOpen && toggleLine();
  }, [router.pathname]);

  const [showMenu, setShowMenu] = useState(false);
  return (
    <header id="topnav" className="defaultscroll sticky">
      <div className="container d-flex justify-content-between">
        <div>
          <Link href="/" prefetch={false}>
            <a className="logo">
              <img
                src="https://studyinfocentre.com/Banner/Study+Info+Centre+logo.png"
                className="img-fluid mx-auto mt-2 d-block"
                alt="logo"
                hight="50"
                width="100"
              />
            </a>
          </Link>
        </div>
        {/* <span className="d-flex justify-content-between"> */}

        <div
          id="navigation"
          style={{ display: state.isOpen ? "block" : "none" }}
        >
          <ul className="navigation-menu" id="top-menu">
            <li className={router.pathname === "/" ? "active" : ""}>
              <Link href="/"  prefetch={false}>
                <a>Home</a>
              </Link>
            </li>
            <li className={router.pathname === "/blog" ? "active" : ""}>
              <Link href="/blog"  prefetch={false}>
                <a>Blog</a>
              </Link>
            </li>
            <li className={router.pathname === "/faq" ? "active" : ""}>
              <Link href="/faq"  prefetch={false}>
                <a>FAQ</a>
              </Link>
            </li>
            <li
              className={
                router.pathname === "/information/about" ? "active" : ""
              }
            >
              <Link href="/information/about"  prefetch={false}>
                <a>About</a>
              </Link>
            </li>
            <li className={router.pathname === "/contact" ? "active" : ""}>
              <Link href="/contact"  prefetch={false}>
                <a>Contact</a>
              </Link>
            </li>
            <li className={router.pathname === "/ask" ? "active" : ""}>
              <Link href="/ask"  prefetch={false}>
                <a>Ask Question</a>
              </Link>
            </li>
          </ul>
        </div>
        <span className="d-flex">
          <div className="menu-extras d-lg-none">
            <div className="menu-item">
              <a
                href="#"
                className={`navbar-toggle ${state.isOpen ? "open" : ""}`}
              >
                <div className="lines" onClick={toggleLine}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </div>
          </div>
          <div className="buy-button">
            {isLoggedIn() ? (
              <div className="profile" onMouseLeave={(_) => setShowMenu(false)}>
                <a
                  className="ant-dropdown-link"
                  onClick={(_) => setShowMenu(true)}
                >
                  <Avatar
                    shape="circle"
                    size={50}
                    className="bg-primary"
                    src={user?.avatar}
                  >
                    {`${user?.first_name?.slice(0, 1)}${user?.last_name?.slice(
                      0,
                      1
                    )}`.toUpperCase()}
                  </Avatar>
                  {showMenu ? menu : null}
                </a>
              </div>
            ) : (
              <Link href="/login">
                <a className="btn btn-secondary">Login</a>
              </Link>
            )}
          </div>
        </span>
        {/* </span> */}
      </div>
    </header>
  );
};

export default Topbar;
