import React from "react";
import APIServices from "src/apiUtils/APIServices";
import StudyInfoCenter from "src/pages/StudyInfoCentre";
//import Script from "next/script";

const HomePage = (props) => <>
	{/*<Script
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
            strategy="lazyOnload"
          />*/}
  <StudyInfoCenter {...props} /></>;
export const getStaticProps = async (_) => {
  const { data, success } = await new APIServices("home-page-count/").get();
  return {
    props: {
      data: success ? data?.data : {}
    },
    revalidate: 300
  };
};
export default HomePage;
