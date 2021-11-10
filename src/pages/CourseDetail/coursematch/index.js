import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PercentageOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { Button } from "antd";
import { ChevronLeft } from "react-feather";
import APIServices from "src/apiUtils/APIServices";
import EntryPage from "./EntryPage";
import BudgetPage from "./BudgetPage";
import DegreePage from "./DegreePage";
import EducationPage from "./EducationPage";
import EnglishTestPage from "./EnglishTestPage";
import loader from "./Loader.svg";
import { CardBody } from "reactstrap";
import useWidth from "src/utilities/widthUtil";
import { useSelector, useDispatch } from "react-redux";
import { valueChanged } from "src/actions/userActions";

//TODO: Needs more changes, once the API is finalized
const CourseMatch = ({ id, degree_level_name }) => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState();
  const [formData, setFormData] = useState({ currency: "USD" });
  const [matchData, setMatchData] = useState();
  const [activePage, setActivePage] = useState(0);
  const [isMatching, setIsMatching] = useState(false);
  const [isModalVisiable, setIsModalVisiable] = useState(false);

  const creds = useSelector((state) => state.auth?.get("creds"));
  const countryDropdown = useSelector((state) =>
    state.user.get("countryDropdown")
  );

  useEffect(() => {
    !!id && fetchDropDownData();
  }, [id]);

  const fetchDropDownData = async () => {
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
    setDropdown(dta);
    setFormData({ ...formData, degree_level: degreeLevels?.data?.data[0]?.id });
  };

  const matchCourse = async (_) => {
    setIsMatching(true);
    setActivePage(activePage + 1);

    const { data, success } = await new APIServices("course-match/").post(
      formData
    );
    if (success) {
      setMatchData(data?.data);
      setIsMatching(false);
    }
    setIsMatching(false);
  };

  const onChange = (id, _value) => {
    setFormData({ ...formData, [id]: _value });
  };

  const getPage = () => {
    switch (activePage) {
      case 0:
        return <EntryPage />;
      case 1:
        return (
          <BudgetPage onChange={onChange} formData={formData} {...dropdown} />
        );
      case 2:
        return (
          <DegreePage
            onChange={onChange}
            formData={formData}
            {...dropdown}
            degree_level={degree_level_name}
          />
        );
      case 3:
        return (
          <EducationPage
            onChange={onChange}
            formData={formData}
            {...dropdown}
          />
        );
      case 4:
        return <EnglishTestPage onChange={onChange} formData={formData} />;
      case 5:
        return isMatching ? (
          <div>
            <img
              loading="lazy"
              height="300px"
              width="100%"
              src={loader}
              alt="loader"
            />
            <h5 className="text-center">Matching your course detail...</h5>
          </div>
        ) : (
          <div className="course-match-result-container">
            <header
              className="course-match-header bg-primary p-4 text-white"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                height: "10rem"
              }}
            >
              <h5 className="text-white">{matchData?.name}</h5>
              <p>{matchData?.address_name}</p>
            </header>
            <div
              className="course-match-result-body container"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "6rem"
              }}
            >
              <CardBody className="shadow rounded bordered bg-white justify-content-space-between p-3">
                <div className="description">
                  <h3 className="tex-secondary">
                    {matchData?.overall_fit_level}
                  </h3>
                </div>
                <dir className="icon">
                  <div data-v-06dc2c18="" class="ScoreCircle">
                    <span data-v-06dc2c18="" class="Score text-secondary">
                      {matchData?.overall_fit_percentage?.toFixed(2)}
                      <span data-v-06dc2c18="" class="Percentage">
                        %
                      </span>
                    </span>
                  </div>
                </dir>
              </CardBody>
              <CardBody className="shadow rounded bordered mt-4 bg-white justify-content-space-between p-3">
                <h4 className="description">Academic Fit</h4>
                <div className="percentage">
                  {matchData?.academic_score?.overall_pc}%
                </div>
              </CardBody>
              <CardBody className="shadow rounded bordered mt-4 bg-white justify-content-space-between p-3">
                <h4 className="description">Budget Fit</h4>
                <div className="percentage">
                  {matchData?.budget_fit?.domestic_budget}%
                </div>
              </CardBody>
            </div>
          </div>
        );

      default:
        return <EntryPage />;
    }
  };

  const isLoggedIn = (_) => {
    if (Boolean(creds?.isLoggedIn)) return true;
    if (typeof window !== "undefined") {
      if (Boolean(window.localStorage.getItem("token"))) return true;
      return false;
    } else {
      return false;
    }
  };
  const { isMobile, isTablet } = useWidth();
  const onSubmit = (e) => {
    e.preventDefault();
    activePage < 4 && setActivePage(activePage + 1);
  };
  return (
    <>
      <div
        className="btn shadow text-white mb-4 bg-primary"
        onClick={() =>
          isLoggedIn()
            ? setIsModalVisiable(true)
            : dispatch(
                valueChanged("activeDrawer", {
                  isVisible: true,
                  drawerKey: "login",
                  title: "Login User"
                })
              )
        }
      >
        Check Eligibility
      </div>
      <Modal
        visible={isModalVisiable}
        centered
        footer={<></>}
        onCancel={() => setIsModalVisiable(false)}
        width={isMobile ? "100%" : isTablet ? "70%" : "25%"}
        bodyStyle={{ minHeight: 560 }}
      >
        <form style={{ fontSize: 16 }} onSubmit={onSubmit}>
          {activePage !== 0 ? (
            <span onClick={() => setActivePage(activePage - 1)}>
              <ChevronLeft />
            </span>
          ) : null}

          {getPage()}

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "2rem",
              width: "80%",
              margin: "auto"
            }}
          >
            {activePage === 0 ? (
              <button
                type="submit"
                className="col btn btn-primary col-md-12 mt-4"
              >
                Start now
              </button>
            ) : activePage < 4 ? (
              <div className="text-center">
                <button className="btn" type="submit">
                  Next
                </button>
              </div>
            ) : null}
            {activePage === 4 ? (
              <Button
                type="primary"
                className="col col-md-12 mt-3"
                onClick={matchCourse}
              >
                Match Course
              </Button>
            ) : null}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CourseMatch;
