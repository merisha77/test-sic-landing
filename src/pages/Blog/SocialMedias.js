import React, { useEffect, useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";

const SocialMedias = (_) => (
  <div className="widget">
    <h4 className="widget-title">Share On</h4>
    <ul className="list-unstyled social-icon mt-4 mb-0">
      <SocialIcon mdiIconClass="facebook" Wrapper={FacebookShareButton} />
      <SocialIcon mdiIconClass="email" Wrapper={EmailShareButton} />
      <SocialIcon mdiIconClass="twitter" Wrapper={TwitterShareButton} />
      {/* <SocialIcon mdiIconClass="pinterest" Wrapper={PinterestShareButton} /> */}
      <SocialIcon mdiIconClass="whatsapp" Wrapper={WhatsappShareButton} />
    </ul>
  </div>
);

export default SocialMedias;

const SocialIcon = ({ mdiIconClass, Wrapper }) => {
  const [windoww, setWindoww] = useState();
  useEffect(() => {
    setWindoww(window);
  }, []);
  return (
    <li className="list-inline-item mr-1">
      <a className="rounded">
        <Wrapper url={windoww?.location?.href}>
          <i className={`mdi mdi-${mdiIconClass}`}></i>
        </Wrapper>
      </a>
    </li>
  );
};
