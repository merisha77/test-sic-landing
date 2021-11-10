import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem
} from "reactstrap";

import Message from "./Message";
import Interest from "./Interest";
import Application from "./Application";
import PersonalDetail from "./PersonalDetail";
import EducationDetail from "./EducationDetail";
import APIServices from "src/apiUtils/APIServices";
import {
  fetchOtherTests,
  fetchEnglishTests,
  fetchApplications,
  fetchEducationDetails,
  fetchInterests,
  deleteValue,
  fetchMessages,
  valueChanged,
  fetchBudget
} from "src/actions/userActions";
import Budget from "./Budget";
import useWidth from "src/utilities/widthUtil";
import { ChangePassword } from "./ChangePassword";
import { AccountHeroContainer } from "./AccountHeroContainer";
import Document from "./Documents";
import Modal from "antd/lib/modal/Modal";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

const Account = (_) => {
  const router = useRouter();
  const { isMobile } = useWidth();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    activeTab: "1"
  });
  const [skip, setSkip] = useState([]);

  const [dropdownData, setDropdownData] = useState();
  const { creds, profile, countryDropdown } = useSelector((state) => ({
    creds: state.auth.get("creds"),
    profile: state.user.get("profile")?.toJS(),
    countryDropdown: state.user.get("countryDropdown")
  }));
  let dta = undefined;
  if (typeof window !== "undefined" && !!window?.localStorage.getItem("user"))
    dta = JSON.parse(window.localStorage.getItem("user"));
  const [userData, setUserData] = useState(dta);

  const toggle = (tab) => setState({ ...state, activeTab: tab });

  useEffect(() => {
    if (!!profile) {
    } else fetchData();
    return () => {
      dispatch(deleteValue("profile"));
    };
  }, []);

  const fetchData = (_) => {
    dispatch(fetchOtherTests());
    dispatch(fetchEnglishTests());
    dispatch(fetchEducationDetails());
    dispatch(fetchInterests());
    dispatch(fetchApplications());
    dispatch(fetchMessages());
    dispatch(fetchBudget());
  };

  useEffect(() => {
    if (isLoggedIn()) {
      fetchDropdownData();
      fetchProfile();
    } else router.push("/");
  }, []);

  const fetchProfile = async () => {
    const user = JSON.parse(window.localStorage?.getItem("user") || "{}");
    const { data, success } = await new APIServices(
      `/profile/${user?.id}`
    ).get();
    if (success) {
      window.localStorage.setItem(
        "user",
        JSON.stringify({ ...user, ...data, avatar: data?.avatar })
      );
      setUserData(data);
    }
  };

  const fetchDropdownData = async () => {
    const dta = {};
    if (countryDropdown?.length) {
      dta["countries"] = countryDropdown;
    } else {
      const countries = await new APIServices("country-dropdown/").get();
      if (countries?.success) {
        dta["countries"] = countries?.data?.data;
        dispatch(valueChanged("countryDropdown", countries?.data?.data));
      }
    }
    const degreeLevels = await new APIServices("drop_down/degree-level/").get();
    if (degreeLevels?.success) dta["degreeLevels"] = degreeLevels?.data?.data;

    const categories = await new APIServices("drop_down/category/").get();
    if (categories?.success) dta["categories"] = categories?.data?.data;
    setDropdownData(dta);
  };

  const isLoggedIn = (_) => {
    if (!!creds?.isLoggedIn) return true;
    if (!!window.localStorage.getItem("token")) return true;
    return false;
  };
  const [isVisible, setIsVisible] = useState();

  const getForm = (_) => {
    if (
      !!userData?.first_name &&
      !!userData?.last_name &&
      !!userData?.dob &&
      !!userData?.email &&
      !!userData?.country_code &&
      !!userData?.phone_number &&
      !!userData?.city
    ) {
    } else
      return (
        <PersonalDetail
          data={userData}
          fetchData={fetchProfile}
          dropdownData={dropdownData}
          showDetail={false}
        />
      );

    if (
      !!profile?.educationData?.length &&
      (!!profile?.englishTests?.length || skip?.includes("language"))
    ) {
    } else
      return (
        <EducationDetail
          {...profile}
          showDetail={false}
          fetchData={fetchData}
          dropDownData={dropdownData}
          skipEnglish={skip?.includes("language")}
          onSkip={(_) => setSkip([...skip, "language"])}
        />
      );
    if (!profile?.interests?.length && !skip?.includes("interest"))
      return (
        <Interest
          showDetail={false}
          interests={profile?.interests}
          dropdownData={dropdownData}
          onSkip={(_) => setSkip([...skip, "interest"])}
          fetchInterest={(_) => dispatch(fetchInterests())}
        />
      );
    return (
      <Document
        showDetail={false}
        onSkip={(_) => setSkip([...skip, "document"])}
      />
    );
  };

  const showDetailData = (_) => {
    let result = true;
    if (
      !!userData?.first_name &&
      !!userData?.last_name &&
      !!userData?.dob &&
      !!userData?.email &&
      !!userData?.country_code &&
      !!userData?.phone_number &&
      !!userData?.city
    ) {
    } else result = "Continue Application";

    if (!!profile?.interests?.length || skip?.includes("interest")) {
    } else result = "Continue Application";
    if (
      profile?.educationData?.length &&
      (profile?.englishTests?.length || skip?.includes("language"))
    ) {
    } else result = "Continue Application";
    // if (skip?.includes("document")) {
    // } else result = "Continue Application";

    if (result === true && isVisible) setIsVisible(false);
    return result;
  };

  return (
    <React.Fragment>
      <Head>
        <title>User Dashboard | Study Info Centre</title>
      </Head>

      <AccountHeroContainer toggle={toggle} userData={userData} />
      <section className="section mt-60 mt-sm-4 pt-sm-10">
        <Modal
          title="Student Application"
          visible={isVisible}
          footer={[]}
          onCancel={() => setIsVisible(false)}
          style={{ minWidth: "70%" }}
        >
          {getForm()}
        </Modal>
        {showDetailData() === "Continue Application" ? (
          <div className="container w-100  d-flex">
            <button
              className="btn btn-secondary shadow"
              style={{ margin: "0 auto" }}
              onClick={(_) => setIsVisible(true)}
            >
              {!!userData?.first_name &&
              !!userData?.last_name &&
              !!userData?.dob &&
              !!userData?.email &&
              !!userData?.country_code &&
              !!userData?.phone_number &&
              !!userData?.state &&
              !!userData?.city &&
              !!userData?.postal_code
                ? "Continue Application"
                : "Start Application"}
            </button>
          </div>
        ) : (
          <Container className="mt-lg-3">
            <Row>
              <NavbarContainer
                isMobile={isMobile}
                toggle={toggle}
                state={state}
              />
              <Col lg="10" md="8" xs="12" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                <div className="ml-lg-3 ml-4 ml-sm-0">
                  <div className="border-bottom pb-4">
                    <TabContent activeTab={state.activeTab}>
                      <TabPane tabId="1" className={isMobile ? "p-0" : "p-3"}>
                        <PersonalDetail
                          data={userData}
                          fetchData={fetchProfile}
                          dropdownData={dropdownData}
                        />
                      </TabPane>
                      <TabPane tabId="2" className={isMobile ? "p-0" : "p-3"}>
                        <EducationDetail
                          {...profile}
                          fetchData={fetchData}
                          dropDownData={dropdownData}
                        />
                      </TabPane>
                      <TabPane tabId="3" className={isMobile ? "p-0" : "p-3"}>
                        <Document />
                      </TabPane>
                      <TabPane tabId="4" className={isMobile ? "p-0" : "p-3"}>
                        <Budget
                          budget={profile?.budget}
                          countries={dropdownData?.countries}
                        />
                      </TabPane>
                      <TabPane tabId="5" className={isMobile ? "p-0" : "p-3"}>
                        <Interest
                          interests={profile?.interests}
                          dropdownData={dropdownData}
                          fetchInterest={(_) => dispatch(fetchInterests())}
                        />
                      </TabPane>
                      <TabPane tabId="6" className={isMobile ? "p-0" : "p-3"}>
                        <Application applications={profile?.applications} />
                      </TabPane>
                      <TabPane tabId="7" className={isMobile ? "p-0" : "p-3"}>
                        <Message messages={profile?.messages} />
                      </TabPane>
                      <TabPane tabId="8" className={isMobile ? "p-0" : "p-3"}>
                        <ChangePassword toggle={toggle} />
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </React.Fragment>
  );
};

export default Account;

const NavItemWrapper = ({ toggle, state, label, id }) => (
  <NavItem className="col-sm-6 col-lg-12 col-md-12 col-6">
    <a
      className={`${
        state.activeTab === id ? "active" : ""
      } rounded mt-2 nav-link`}
      onClick={() => {
        toggle(id);
      }}
    >
      <div className="text-center pt-1 pb-1">
        <h4
          className={`${
            state.activeTab === id ? "text-white " : ""
          }title font-weight-normal mb-0`}
        >
          {label}
        </h4>
      </div>
    </a>
  </NavItem>
);

const NavbarContainer = ({ isMobile, toggle, state }) => {
  return (
    <Col lg="2" md="4" xs="12">
      <div className={`sidebar ${isMobile ? "p-0" : "p-4"} rounded shadow`}>
        <Nav pills className="mt-2" horizontal={isMobile ? true : false}>
          <NavItemWrapper
            toggle={toggle}
            state={state}
            label="Personal"
            id="1"
          />
          <NavItemWrapper
            toggle={toggle}
            state={state}
            label="Education"
            id="2"
          />
          <NavItemWrapper
            toggle={toggle}
            state={state}
            label="Documents"
            id="3"
          />
          <NavItemWrapper toggle={toggle} state={state} label="Budget" id="4" />
          <NavItemWrapper
            toggle={toggle}
            state={state}
            label="Interest"
            id="5"
          />
          <NavItemWrapper
            toggle={toggle}
            state={state}
            label="Application"
            id="6"
          />
          <NavItemWrapper
            toggle={toggle}
            state={state}
            label="Message"
            id="7"
          />
        </Nav>
      </div>
    </Col>
  );
};
