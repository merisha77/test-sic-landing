import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "lib/gtag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <!-- Facebook Pixel Code --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL});
                fbq('track', 'PageView');`
            }}
          />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TAG}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
          
        <script
        dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KDH4PF2');`,
        }}
      />
      <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: `{"@context":"http://schema.org","@type":"Organization","url":"https://studyinfocentre.com/","logo":" https://studyinfocentre.com/Banner/Study+Info+Centre+logo.png","name":"Study Info Centre","sameAs":["https://twitter.com/studyinfocentre","https://www.facebook.com/studyinfocentreofficalpage","https://www.linkedin.com/company/studyinfocentre/","https://www.instagram.com/studyinfocentre/","https://www.youtube.com/channel/UCEGIfIoQCD4mkn5SuAPX1Fw"],"telephone":"1300343588"}` }}>
        
        </script>
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index,follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
        </Head>
        <body>
          <noscript>
            <iframe
              src="https://www.facebook.com/tr?id=532673193761240&ev=PageView&noscript=1"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
            <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDH4PF2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}>
          </iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
