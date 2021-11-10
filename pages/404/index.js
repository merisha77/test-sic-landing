import React from "react";
import Link from "next/link";
import Head from "next/head";

const ErrorPage = () => (
  <div className="wrapper">
    <Head>
      <title>404 not found!</title>
    </Head>
    <h2>Oops! Page not found.</h2>
    <div>
      <img src="/404.png" alt="404" />
    </div>
    <h4>We can't fint the page you're looking for.</h4>
    <Link href="/">
      <button type="button" className="main-btn bg-primary">
        GO BACK HOME
      </button>
    </Link>
  </div>
);

export default ErrorPage;
