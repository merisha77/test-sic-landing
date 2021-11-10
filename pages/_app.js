import { wrapper } from "../store";

import "public/styles/Apps.scss";
import "public/styles/css/materialdesignicons.min.css";
import "public/styles/nprogress.css";
// import "react-languages-select/scss/react-languages-select.scss";
// RBCarousel Declare

import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "public/styles/css/carousel.css";
import NProgress from 'nprogress';
import Layout from "src/components/Layout";
import { useEffect } from "react";
import Router from 'next/router';
import Link from "next/link";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     setTimeout((_) => {
  //       setLoading(false);
  //     }, 250);

  //     gtag.pageview(url);
  //   };

  //   const handleRouteChangeStart = (_) => {
  //     setLoading(true);
  //   };

  //   router.events.on("routeChangeStart", handleRouteChangeStart);
  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChangeStart);
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  //Binding events. 
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  const hide = () => {
    const cookieBan = document.getElementById("cookieBanner");
    window.localStorage.setItem("accept-cookie", true);
    cookieBan.style.display = "none";
  };

  useEffect(() => {
    const acceptCookie = window.localStorage.getItem("accept-cookie");
    const cookieBan = document.getElementById("cookieBanner");
    console.log(acceptCookie);
    if (acceptCookie === null) {
      cookieBan.style.display = "block";
    }
  }, []);
  return (
    <>
      <span id="cookieBanner">
        <div className="cookie-banner bg-secondary rounded shadow p-4 d-flex justify-content-space-between">
          <span className="cookie-banner-message text-white">
            This website uses cookies to ensure you get the best experience & by
            continuing to use our website, you agree to our{" "}
            <Link href="/information/privacy">
              <span role="button" className="text-primary">
                Privacy and Cookie Policy.
              </span>
            </Link>
          </span>
          <div className="cookie-banner-compliance">
            <span
              className="btn btn-md btn-primary"
              tabIndex="2"
              onClick={hide}
            >
              Got it!
            </span>
          </div>
        </div>
      </span>
      {/* <Layout>{loading ? <Loading /> : <Component {...pageProps} />}</Layout>  */}
      <Layout><Component {...pageProps} /></Layout>
      <Head>
        <meta
          property="og:image"
          content="https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/cover_website.png"
        />
      </Head>
    </>
  );
};

export default wrapper.withRedux(App);
