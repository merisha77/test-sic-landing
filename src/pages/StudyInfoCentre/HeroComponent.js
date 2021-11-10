import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

import StatsCard from "./StatsCard";
import TypistWrapper from "./TypistWrapper";
import {
  fetchCountries,
  fetchSuggestionCourses
} from "src/actions/userActions";

import InputField, { SelectInput } from "./InputField";
import { sortThis } from "src/utilities/sortUtil";
import { useRouter } from "next/dist/client/router";

const HeroComponent = ({ total_course, total_institution, total_country }) => {
  const history = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();
  const { categories, courseSuggestions } = useSelector((state) => ({
    courseSuggestions: state.user.get("courseSuggestions"),
    categories: state.user.get("categories")
  }));

  useEffect(() => fetchData(), []);

  const fetchData = (_) => {
    !categories && dispatch(fetchCountries());
    typeof courseSuggestions === "undefined" &&
      dispatch(fetchSuggestionCourses());
  };

  const onChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    formData &&
      Object.keys(formData).forEach((k) => {
        params.set(k, formData[k]);
      });

    const url = `/search/?${params.toString()}`;
    history.push(url);
  };

  return (
    <section
      className="bg-marketing"
      style={{
        background: `url(${require("public/styles/images/marketing/marketing-shape.png")})`
      }}
      id="home"
    >
      <div className="home-center">
        <div className="home-desc-center">
          <div className="container">
            <Row className="align-items-center">
              <Col lg={12} md={12}>
                <div className="title-heading pt-3 mt-100">
                  <TypistWrapper />
                  <Row id="counter" className="counter-wrapper">
                    <StatsCard
                      //icon="https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/earth.png"
                      icon="earth"
                      label="Country"
                      count={total_country || ""}
                    />
                    <StatsCard
                      //icon="https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/university+icon.png"
                      icon="bank"
                      label="University"
                      count={total_institution || ""}
                    />
                    <StatsCard
                      //icon="https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/course+icon.png"
                      icon="library-books"
                      label="Course"
                      count={total_course || ""}
                    />
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
          <div className="container">
            <Row className="justify-content-center">
              <Col lg={12}>
                <form onSubmit={onSubmit} className="p-4 ">
                  <Row className="text-left">
                    <CustomAutoComplete
                      width={3}
                      onChange={(value) => onChange("course", value)}
                      id="course"
                      placeholder="Course"
                      value={formData?.course}
                      options={
                        courseSuggestions?.course
                          ?.sort(sortThis("name"))
                          ?.filter(({ name }) =>
                            name
                              ?.toLowerCase()
                              .includes(formData?.course?.toLowerCase())
                          ) || []
                      }
                    />
                    <CustomAutoComplete
                      width={3}
                      onChange={(value) => onChange("location", value)}
                      id="location"
                      placeholder="Location"
                      value={formData?.location}
                      options={
                        courseSuggestions?.country
                          ?.sort(sortThis("name"))
                          ?.filter(({ name }) =>
                            name
                              ?.toLowerCase()
                              .includes(formData?.location?.toLowerCase())
                          ) || []
                      }
                    />

                    <SelectInput
                      width={3}
                      className="rounded-select scroll-touch"
                      onChange={(value) => onChange("degree_level", value)}
                      id="degree_level"
                      placeholder="Degree Level"
                      value={formData?.degree_level}
                      options={categories?.sort(sortThis("name"))?.map((c) => ({
                        key: c.slug,
                        value: c.name
                      }))}
                    />
                    <Col lg={2} md={3} className="pt-2">
                      <div className="form-group">
                        <input
                          className="flatpickr flatpickr-input form-control"
                          type="submit"
                          id="search"
                          name="search"
                          className="searchbtn btn btn-secondary w-100 p"
                          value="Search"
                        />
                      </div>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;

const CustomAutoComplete = ({
  width = 3,
  onChange,
  options,
  id,
  placeholder,
  value
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InputField
      width={width}
      wrapperStyle={{ display: "grid" }}
      className="rounded"
      onChange={({ target: { value } }) => onChange(value)}
      id={id}
      placeholder={placeholder}
      value={value}
      suffix={<SearchOutlined />}
      autocomplete="off"
      onFocus={(_) => setIsVisible(true)}
      onBlur={(_) => setTimeout((_) => setIsVisible(false), 500)}
    >
      {isVisible && options?.length ? (
        <div
          className="ant-select-dropdown ant-select-dropdown-placement-bottomLeft "
          style={{
            minWidth: 330,
            width: 330,
            left: 15,
            top: 50,
            maxHeight: 256,
            overflowY: "auto",
            overflowAnchor: "none"
          }}
        >
          {options?.map(({ name }) => (
            <div
              onClick={(_) => {
                onChange(name);
                setIsVisible(false);
              }}
              role="button"
              key={name}
              className="ant-select-item ant-select-item-option custom-input"
            >
              <div className="ant-select-item-option-content">{name}</div>
            </div>
          ))}
        </div>
      ) : null}
    </InputField>
  );
};
