import React, { useState, useEffect } from "react";

import { notification } from "antd";

import { useDispatch, useSelector } from "react-redux";
import APIServices from "src/apiUtils/APIServices";
// import ReactLanguageSelect from "react-languages-select";
// import useEnglishTest from "src/utilities/useEnglishTest";
import { fetchHomePageData } from "src/actions/userActions";

import Link from "next/link";

const Footer = (_) => {
  const dispatch = useDispatch();
  const [userLocationDetail, setUserLocationDetail] = useState();
  const { homePageData } = useSelector((state) => ({
    homePageData: state.user.get("home")
  }));

  const fetchUserDtl = async () => {
    const { data, success } = await new APIServices("ip-address/").get();
    if (success) {
      window.localStorage.setItem("userIpDetail", JSON.stringify(data?.data));
      setUserLocationDetail(data?.data);
    }
  };

  useEffect(() => {
    if (!!window.localStorage.getItem("userIpDetail")) {
      setUserLocationDetail(
        JSON.parse(window.localStorage.getItem("userIpDetail"))
      );
    } else fetchUserDtl();

    {
      /* fetchCountryData(); */
    }
    if (
      typeof window !== "undefined" &&
      !JSON.parse(window.localStorage.getItem("englishTests") || "[]")?.length
    )
      window.localStorage.getItem("token") !== null && fetchEnglishTests();
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "73657bda-fd6c-4709-abbe-bf5bc471a7af";

    (function () {
      var d = document;
      var s = d.createElement("script");

      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, []);

  const fetchEnglishTests = async () => {
    const { data, success } = await new APIServices(
      "core/course/english/"
    ).get();
    if (success)
      window.localStorage.setItem(
        "englishTests",
        JSON.stringify(
          data?.data?.map(({ id, name }) => ({ key: id, value: name }))
        )
      );
  };

  useEffect(() => fetchData(), []);

  const fetchData = (_) => {
    !homePageData && dispatch(fetchHomePageData());
  };

  {
    /*   const fetchCountryData = async (_) => {
    let _countries = undefined;
    if (!countryDropdown?.length) {
      const { data, success } = await new APIServices(
        "country-dropdown/"
      ).get();
      if (success) {
        dispatch(valueChanged("countryDropdown", data?.data));
        _countries = data?.data?.map(({ alpha2Code, currency: { code } }) => ({
          alpha2Code,
          currency: code,
        }));
      }
    } else {
      _countries = countryDropdown?.map(
        ({ alpha2Code, currency: { code } }) => ({
          alpha2Code,
          currency: code,
        })
      );
    }

    setCountries(_countries);
    let _exchangeData = !!window.localStorage.getItem("exchange_rates")
      ? JSON.parse(window.localStorage.getItem("exchange_rates"))
      : undefined;

    if (!!_exchangeData) {
      const _custom = {};
      const _ = Object.keys(_exchangeData).forEach((key) => {
        _custom[
          _countries?.find(({ currency }) => currency === key)?.alpha2Code
        ] = key;
      });
      _custom["US"] = "USD";
      setCustomLabels(_custom);
    } else {
      const exchange = await new APIServices("rate-converter/").post();
      if (exchange.success) {
        _exchangeData = exchange.data?.data?.rate;
        window.localStorage.setItem(
          "exchange_rates",
          JSON.stringify(_exchangeData)
        );
        const _custom = {};
        const _ = Object.keys(_exchangeData).forEach((key) => {
          _custom[
            _countries?.find(({ currency }) => currency === key)?.alpha2Code
          ] = key;
        });
        _custom["US"] = "USD";
        setCustomLabels(_custom);
      }
    }
  };

  const eng = useEnglishTest();
*/
  }
  return (
    <React.Fragment>
      <footer className='footer bg-primary '>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2'>
              <Link href='/' prefetch={false}>
                <a className='logo-footer'>Study Info Centre</a>
              </Link>
              <p className='mt-4'>Plan your better career from here.</p>
              <ul className='list-unstyled social-icon social mb-0 mt-4'>
                {homePageData?.social_media?.map((e, idx) => (
                  <li className='list-inline-item' key={`media-${idx}`}>
                    <a
                      href={e.url}
                      target='_blank'
                      rel='noreferrer'
                      className='rounded mr-1'
                    >
                      <i
                        className={`mdi mdi-${e.name}`}
                        title={`${e.name}`}
                      ></i>
                    </a>
                  </li>
                ))}
                {/* <li className="list-inline-item">
                  <Link href="#" className="rounded mr-1">
                    <i className="mdi mdi-instagram" title="Instagram"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link href="#" className="rounded">
                    <i className="mdi mdi-twitter" title="Twitter"></i>
                  </Link>
                </li>
              */}
              </ul>
              {/*          <ul
                className="list-unstyled d-flex"
                style={{
                  width: "fit-content",
                }}
              >
                <ReactFlagsSelect
                  onSelect={async (country) => {
                    const to_currency = countries?.find(
                      ({ alpha2Code }) => alpha2Code === country
                    )?.currency;

                    window.localStorage.setItem("currency", to_currency);
                    window.localStorage.setItem("country", country);
                    history.go();
                  }}
                  optionsSize={15}
                  selectedSize={15}
                  defaultCountry={
                    (typeof window !== "undefined" &&
                      window.localStorage?.getItem("country")) ||
                    "US"
                  }
                  countries={Object.keys(customLabels || {})}
                  placeholder="Currency"
                  customLabels={customLabels}
                />

                <ReactLanguageSelect
                  disabled
                  defaultLanguage={userLocationDetail?.countryCode || "en"}
                  onSelect={(language) =>
                    window.localStorage.setItem("language", language)
                  }
                  placeholder="Language"
                />
              </ul>
*/}
            </div>
            <div className='row col-lg-5 col-5 col-12'>
              <div className='col-lg-5 col-md-6 col-5 mt-4 mt-sm-0 pt-2 pt-sm-0'>
                <h4 className='text-light footer-head'>Company</h4>
                <ul className='list-unstyled footer-list mt-4'>
                  <li>
                    <Link href='/information/about' prefetch={false}>
                      <a className='text-foot'>
                        <i className='mdi mdi-chevron-right mr-1'></i> About us
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/information/terms' prefetch={false}>
                      <a className='text-foot'>
                        <i className='mdi mdi-chevron-right mr-1'></i> Terms and
                        Conditions
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/information/privacy' prefetch={false}>
                      <a className='text-foot'>
                        <i className='mdi mdi-chevron-right mr-1'></i> Privacy &
                        Policy
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/contact' prefetch={false}>
                      <a className='text-foot'>
                        <i className='mdi mdi-chevron-right mr-1' /> Contact Us
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/faq' prefetch={false}>
                      <a className='text-foot'>
                        <i className='mdi mdi-chevron-right mr-1'></i> FAQ
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='col-lg-7 col-md-6 col-7 mt-4 mt-sm-0 pt-2 pt-sm-0'>
                <h4 className='text-light footer-head'>Useful Links</h4>
                <ul className='list-unstyled footer-list mt-4'>
                  <li>
                    <Link href='/ask' prefetch={false}>
                      <a className='text-foot'>
                        <i className='mdi mdi-chevron-right mr-1'></i> Ask
                        Question
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href='/login'>
                      <a className='text-foot'>
                        <i className='mdi mdi-chevron-right mr-1'></i> Login
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href='/blog' prefetch={false}>
                      <a className='text-foot'>
                        <i className='mdi mdi-chevron-right mr-1' /> Blog
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href='/country-list' prefetch={false}>
                      <a className='text-foot'>
                        <i className='mdi mdi-chevron-right mr-1' /> Country
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href='/course-category-list' prefetch={false}>
                      <a className='text-foot'>
                        <i className='mdi mdi-chevron-right mr-1' /> Course
                        Category
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <SubscribeFormWrapper />
          </div>
        </div>
      </footer>

      <footer className='footer footer-bar bg-primary'>
        <div className='container text-center'>
          <div className='row align-items-center'>
            <div className='col-sm-3' />
            <div className='col-sm-6'>
              <p className='mb-0'>
                Copyright © {new Date().getFullYear()} All Rights Reserved |
                Study Info Centre.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;

const SubscribeFormWrapper = (_) => {
  const [email, setEmail] = useState();
  const onSubscribe = async (e) => {
    e.preventDefault();
    const { data, success } = await new APIServices("subscribe-us/").post({
      email
    });
    if (success) {
      notification.success({ message: data?.data });
      setEmail();
    }
  };
  return (
    <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
      <h4 className="text-light footer-head">Newsletter</h4>
      <p className="mt-4">Sign up and receive the latest tips via email.</p>
      <form onSubmit={onSubscribe}>
        <div className="row">
          <div className="col-lg-12">
            <div className="foot-subscribe form-group position-relative">
              <label>
                Write your email <span className="text-danger">*</span>
              </label>
              <i className="mdi mdi-email ml-3 icons"></i>
              <input
                type="email"
                id="email"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                className="form-control pl-5 rounded bg-primary"
                placeholder="Your email : "
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <input
              type="submit"
              id="submitsubscribe"
              name="send"
              className="btn btn-secondary w-100"
              value="Subscribe"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
