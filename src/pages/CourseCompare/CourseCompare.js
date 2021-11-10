import React, { useEffect, useState } from "react";

import notification from "antd/lib/notification";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";

import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
// import { Link, useLocation, useHistory } from "react-router-dom";

import { Clock, Map, List } from "react-feather";
import { http } from "src/apiUtils/api";
import InputField from "src/pages/StudyInfoCentre/InputField";
import APIServices from "src/apiUtils/APIServices";
import { formatCurrency } from "src/utilities/CurrencyUtil";

import { DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { valueChanged } from "src/actions/userActions";
import getDurationType from "src/utilities/durationUtil";
import { getStudyMode, getStudyLoad } from "src/utilities/studyModeLoadUtil";

import useWidth from "src/utilities/widthUtil";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

const CourseCompare = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState();
  const [modalData, setModalData] = useState({
    email: undefined,
    visible: false
  });
  const [existingProcess, setExistingProcess] = useState();

  const dispatch = useDispatch();
  const [courseCompareData, setCourseCompareData] = useState();

  const [
    transformedEnglishRequirement,
    setTransformedEnglishRequirement
  ] = useState([]);

  useEffect(() => {
    !!router.query.courses && fetchCourseCompareData();
  }, [router.query]);

  const fetchCourseCompareData = async (_) => {
    const { data, success } = await new APIServices(
      `course-compare/?compare_course=${router.query?.courses}`
    ).get();
    if (success) setCourseCompareData(data?.slice(0, 5));
    else router.push("/");
  };

  useEffect(() => {
    transformObj(courseCompareData);
  }, [courseCompareData]);

  const downloadReport = (_) => {
    if (isLoggedIn()) {
      setIsLoading(true);
      const url = `download-course-compare/?compare_course=${courseCompareData
        ?.map((c) => c.id)
        ?.toString()}`;
      http({ url, method: "get", responseType: "blob" })
        .then((res) => {
          if (res.status === 200) {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(new Blob([res.data]));
            link.setAttribute("download", "course_compare.pdf");
            document.body.appendChild(link);
            link.click();
          } else {
            notification.error({
              message: "Could not download compare sheet at the moment."
            });
          }
        })
        .finally((_) => setIsLoading(false));
    } else {
      setExistingProcess("download");
      dispatch(
        valueChanged("activeDrawer", {
          isVisible: true,
          drawerKey: "login",
          title: "User Login"
        })
      );
    }
  };

  const mailReport = async (_) => {
    if (!!modalData?.email) {
      setIsLoading(true);
      const { data, success } = await new APIServices(
        "course-compare-email/"
      ).post({
        compare_course: courseCompareData?.map((c) => c.id)?.toString(),
        to_email: modalData?.email
      });
      if (success) {
        setModalData({ visible: false });
        notification.success({ message: "Email Sent." });
        setIsLoading(false);
      } else {
        setModalData({ visible: false });
        notification.error({ message: "Could not mail the report." });
        setIsLoading(false);
      }
    }
  };

  //Note: The following function is mess. Avoid changing anything
  let transformObj = (data = []) => {
    let dta = {};
    const keys = new Set();
    const rdm = data.forEach(({ id, english_requirements }) => {
      const dt = english_requirements?.forEach(({ name }) => {
        keys.add(name);
      });
    });

    let newData = data?.map(({ id, english_requirements }) => {
      let obj = Array.from(keys)?.map((a) => {
        if (dta[a])
          if (english_requirements?.some((b) => b.name === a)) {
            dta[a] = [
              ...dta[a],
              {
                ...english_requirements?.find((b) => b.name === a),
                id
              }
            ];
          } else {
            dta[a] = [
              ...dta[a],
              {
                overall_score: "N/A",
                listening: 0,
                reading: 0,
                writing: 0,
                speaking: 0,
                id
              }
            ];
          }
        else if (english_requirements?.some((b) => b.name === a)) {
          dta[a] = [
            {
              ...english_requirements?.find((b) => b.name === a),
              id
            }
          ];
        } else {
          dta[a] = [
            {
              overall_score: "N/A",
              listening: 0,
              reading: 0,
              writing: 0,
              speaking: 0,
              id
            }
          ];
        }
      });
    });
    setTransformedEnglishRequirement(dta);
  };

  const creds = useSelector((state) => state.auth?.get("creds"));

  const isLoggedIn = (_) => {
    if (Boolean(creds?.isLoggedIn)) return true;
    if (typeof window !== "undefined") {
      if (Boolean(window.localStorage.getItem("token"))) return true;
      return false;
    } else {
      return false;
    }
  };
  const { isMobile } = useWidth();

  useEffect(() => {
    if (isLoggedIn()) {
      if (!!existingProcess) {
        if (existingProcess === "email") setModalData({ visible: true });
        else downloadReport();
        setExistingProcess();
      }
    }
  }, [isLoggedIn()]);

  useEffect(() => {
    if (modalData.visible) {
      const user = JSON.parse(window.localStorage?.getItem("user") || "{}");
      setModalData({ ...modalData, email: user?.email });
    }
  }, [modalData.visible]);
  return (
    <>
      <Head>
        <title>Course Compare | Study Info Centre</title>
      </Head>
      <BreadComb />
      <Modal
        title="Enter Email Address"
        visible={modalData?.visible}
        onOk={mailReport}
        okText={isLoading ? "Sending" : "Send"}
        confirmLoading={isLoading}
        onCancel={() => setModalData({ visible: false, email: undefined })}
      >
        <InputField
          id="email"
          label="Email"
          required
          width={12}
          defaultValue={modalData?.email || undefined}
          onChange={({ target: { value } }) =>
            setModalData({ ...modalData, email: value })
          }
        />
      </Modal>
      <section className="compare_section bg-white" id="compare_div">
        <div className="table-responsive">
          <table>
            <tr>
              <th className="show TblInfo">
                <h3>Compare Courses</h3>
              </th>
              {courseCompareData?.map(({ name, id }, idx) => (
                <td className="bg-red course-head" key={`course-name-${idx}`}>
                  {name}

                  {courseCompareData?.length > 2 ? (
                    <a
                      className="remove-ico"
                      onClick={() =>
                        setCourseCompareData(
                          courseCompareData.filter((c) => c.id !== id)
                        )
                      }
                    >
                      <DeleteOutlined style={{ fontSize: 20, color: "#fff" }} />
                    </a>
                  ) : (
                    ""
                  )}
                </td>
              ))}
            </tr>

            <tr>
              <DataHead title="Degree Level" />
              {courseCompareData?.map(({ degree_level_name }, idx) => (
                <DataRow
                  value={degree_level_name}
                  key={`degree_level-${idx}`}
                />
              ))}
            </tr>
            <tr>
              <DataHead title="Institute" />
              {courseCompareData?.map(({ institute_name }, idx) => (
                <DataRow value={institute_name} key={`institute-${idx}`} />
              ))}
            </tr>
            <tr>
              <DataHead title="Institute Type" />
              {courseCompareData?.map(({ institute_type }, idx) => (
                <DataRow value={institute_type} key={`institute_type-${idx}`} />
              ))}
            </tr>
            <tr>
              <DataHead title="Course Category" />
              {courseCompareData?.map(({ category_name }, idx) => (
                <DataRow value={category_name} key={`institute-${idx}`} />
              ))}
            </tr>
            <tr>
              <DataHead title="Study Mode" />
              {courseCompareData?.map(({ study_mode }, idx) =>
                study_mode ? (
                  <DataRow
                    value={getStudyMode(study_mode)}
                    key={`study_mode-${idx}`}
                  />
                ) : (
                  <DataRow value={"N/A"} />
                )
              )}
            </tr>
            <tr>
              <DataHead title="Study Load" />
              {courseCompareData?.map(({ study_load }, idx) =>
                study_load ? (
                  <DataRow
                    value={getStudyLoad(study_load)}
                    key={`study_load-${idx}`}
                  />
                ) : (
                  <DataRow value={"N/A"} />
                )
              )}
            </tr>

            <RequirementWrapper
              colSpan={isMobile ? 3 : courseCompareData?.length + 1 || 4}
              icon={<Clock />}
              title="Duration"
            >
              <tr>
                <DataHead title={<>Duration</>} />
                {courseCompareData?.map(({ duration, per_duration }, idx) => (
                  <DataRow
                    value={`${duration} ${getDurationType(per_duration)}${
                      duration > 1 ? "s" : ""
                    }`}
                    key={`duration-${idx}`}
                  />
                ))}
              </tr>
            </RequirementWrapper>
            <RequirementWrapper
              colSpan={isMobile ? 3 : courseCompareData?.length + 1 || 4}
              icon={<Map />}
              title="Location"
            >
              <tr>
                <DataHead title="Country" />
                {courseCompareData?.map(({ address_list }, idx) => (
                  <td>
                    {" "}
                    {address_list.length > 0
                      ? address_list?.map(({ city, country, suburb }) => (
                          <span className="txt-l">
                            {suburb}
                            {suburb ? ", " : `${city}, `} {country} <br />
                          </span>
                        ))
                      : "N/A"}
                  </td>
                ))}
              </tr>
            </RequirementWrapper>
            <RequirementWrapper
              colSpan={isMobile ? 3 : courseCompareData?.length + 1 || 4}
              icon={
                <svg style={{ height: 25, width: "auto" }} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z"
                  />
                </svg>
              }
              title="Tuition Fee"
            >
              <tr>
                <DataHead title="International" />
                {courseCompareData?.map(
                  ({ fee_international, currancy_name, per_fee }, idx) =>
                    fee_international ? (
                      <DataRow
                        value={`${formatCurrency(
                          fee_international,
                          currancy_name
                        )} per ${getDurationType(per_fee)}`}
                        key={`fee_international-${idx}`}
                      />
                    ) : (
                      <DataRow value={`N/A`} key={`fee_international-${idx}`} />
                    )
                )}
              </tr>
              <tr>
                <DataHead title="Domestic" />
                {courseCompareData?.map(
                  ({ fee_domestic, currancy_name, per_fee }, idx) =>
                    fee_domestic ? (
                      <DataRow
                        value={`${formatCurrency(
                          fee_domestic,
                          currancy_name
                        )} per ${getDurationType(per_fee)}`}
                        key={`fee_domestic-${idx}`}
                      />
                    ) : (
                      <DataRow value={`N/A`} key={`fee_domestic-${idx}`} />
                    )
                )}
              </tr>
            </RequirementWrapper>
            <RequirementWrapper
              colSpan={isMobile ? 3 : courseCompareData?.length + 1 || 4}
              icon={<List />}
              title="English Requirements"
            >
              {Object.keys(transformedEnglishRequirement || {}).length ? (
                Object.keys(transformedEnglishRequirement).map((a, idx) => (
                  <tr key={`english-requirement-${idx}`}>
                    <DataHead title={a} />
                    {transformedEnglishRequirement[a]?.map(
                      (
                        {
                          listening,
                          speaking,
                          reading,
                          writing,
                          overall_score
                        },
                        idx
                      ) => (
                        <DataRow
                          value={
                            speaking || reading || writing || listening ? (
                              <strong>
                                {`S: ${speaking || "n/a"},`}&nbsp;
                                {`R: ${reading || "n/a"},`}&nbsp;
                                {`W: ${writing || "n/a"},`}&nbsp;
                                {`L: ${listening || "n/a"},`}&nbsp;
                                {`O: ${overall_score || "n/a"}`}
                              </strong>
                            ) : (
                              "N/A"
                            )
                          }
                          key={`${a}-${idx}`}
                        />
                      )
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <DataHead title="" />
                  <td colSpan={courseCompareData?.length || 3}>
                    <span className="txt-l">N/A</span>
                  </td>
                </tr>
              )}
              <tr>
                <DataHead title="" />
                {courseCompareData?.map(({ slug, institute_slug }, idx) => (
                  <td>
                    <Link
                      href={`course-detail/${institute_slug}/${slug}`}
                      className="btn btn-primary"
                    >
                      View Detail
                    </Link>
                  </td>
                ))}
              </tr>
            </RequirementWrapper>
          </table>
        </div>
        <div className="pdfBtn">
          <Button
            className="btn-primary"
            disabled={isLoading}
            onClick={() => {
              if (isLoggedIn()) setModalData({ visible: true });
              else {
                setExistingProcess("email");
                dispatch(
                  valueChanged("activeDrawer", {
                    isVisible: true,
                    drawerKey: "login",
                    title: "User Login"
                  })
                );
              }
            }}
          >
            Email Comparisons
          </Button>
          &nbsp;{" "}
          <Button loading={isLoading} onClick={downloadReport}>
            Download PDF
          </Button>
        </div>
      </section>
    </>
  );
};

const DataRow = ({ value }) => (
  <td>
    <span className="txt-l">{value}</span>
  </td>
);

const RequirementWrapper = ({ icon, title, children, colSpan = 4 }) => (
  <>
    <tr>
      <th colSpan={colSpan} className="sep">
        {icon} &nbsp; {title}
      </th>
    </tr>
    {children}
  </>
);

const DataHead = ({ title }) => (
  <th>
    <strong>{title}</strong>
  </th>
);

const BreadComb = ({}) => (
  <section className="bg-half bg-light course-compare-wrapper">
    <div className="home-center">
      <div className="home-desc-center">
        <div className="container">
          <Row className="justify-content-center">
            <Col lg={12} className="text-center">
              <div className="page-next-level">
                <h1 className="title">Course Compare </h1>

                <ul className="page-next d-inline-block bg-white shadow p-2 pl-4 pr-4 rounded mb-0">
                  <li>
                    <Link
                      href="/"
                      className="text-uppercase font-weight-bold text-dark"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <span className="text-uppercase text-primary font-weight-bold">
                      Course Compare
                    </span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </section>
);

export default CourseCompare;
