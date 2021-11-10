import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, ChevronDown } from "react-feather";

import Checkbox from "src/components/@vuexy/checkbox/CheckboxesVuexy";

import {
  valueChanged,
  deleteValue,
  courseSearch
} from "src/actions/userActions";

import { FilterSkeleton } from ".";
import { sortThis } from "src/utilities/sortUtil";
import { useRouter } from "next/dist/client/router";
import { getProcessedFilters } from "src/utilities/filterProcess";

const SideFilter = ({ mainSidebar, urlParams }) => {
  const dispatch = useDispatch();

  const { filters, filterList, filterWithLabel } = useSelector((state) => ({
    filters: state.user.get("filters"),
    filterWithLabel: Object.values(
      state.user.get("filterWithLabel")?.toJS() || {}
    ),
    filterList: state.user.get("aggregations")?.toJS() || {}
  }));

  useEffect(() => {
    dispatch(deleteValue("searchData.total"));
    const data = {};
    if (filters?.size) {
      Object.keys(filters.toJS()).forEach(
        (k) => (data[k] = Object.values(filters?.get(k)?.toJS() || {}))
      );
      const processedFilters = filterWithLabel.length
        ? getProcessedFilters(data)
        : undefined;
      dispatch(courseSearch({ ...urlParams, filters: processedFilters }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [filters]);

  const onClick = (key, id, checked) => {
    if (checked) {
      dispatch(valueChanged(`filters.${key}.${id}`, id));
      dispatch(
        valueChanged(`filterWithLabel.${key}-${id}`, {
          key,
          id,
          name: id?.split("---")[0]
        })
      );
    } else {
      dispatch(deleteValue(`filterWithLabel.${key}-${id}`));
      dispatch(deleteValue(`filters.${key}.${id}`));
    }
  };
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setShowFilter(true);
    return (_) => {
      dispatch(deleteValue("aggregations"));
      dispatch(deleteValue("filterWithLabel"));
      dispatch(deleteValue("filters"));
    };
  }, []);

  return (
    <FilterSkeleton
      isActive={!showFilter || !Object.keys(filterList || {}).length}
    >
      {showFilter ? (
        <div className="sidebar-section col-md-12 col-lg-3 col-sm-12">
          <Card>
            <CardBody className="p-2">
              <h4 className="filter-heading d-lg-block text-secondary mt-2 pl-2">
                Filter
                <button
                  className="d-block d-lg-none close mt-2"
                  onClick={() => mainSidebar(false)}
                >
                  <CloseOutlined className="close mt-2" />
                </button>
              </h4>

              <FilterWrapper
                onClick={(key, checked) =>
                  onClick("country_data", key, checked)
                }
                data={{
                  data: Object.values(filterList["address"] || {}),
                  name: "Countries",
                  key: "country_data"
                }}
                filters={filterWithLabel?.filter(
                  (a) => a.key === "country_data"
                )}
                compareKey="location"
              />

              <FilterWrapper
                onClick={(key, checked) =>
                  onClick("categorise_data", key, checked)
                }
                data={{
                  data: Object.values(filterList["category_count"] || {}),
                  name: "Categories",
                  key: "categorise_data"
                }}
                filters={filterWithLabel?.filter(
                  (a) => a.key === "categorise_data"
                )}
                compareKey="course"
              />

              <FilterWrapper
                onClick={(key, checked) =>
                  onClick("degree_level", key, checked)
                }
                data={{
                  data: Object.values(filterList["degree_count"] || {}),
                  name: "Degree Level",
                  key: "degree_level"
                }}
                filters={filterWithLabel?.filter(
                  (a) => a.key === "degree_level"
                )}
                compareKey="degree_level"
              />

              <FilterWrapper
                onClick={(key, checked) => onClick("duration", key, checked)}
                data={{
                  data: Object.values(filterList["duration_ranges"] || {}),
                  name: "Duration(years)",
                  key: "duration"
                }}
                filters={filterWithLabel?.filter((a) => a.key === "duration")}
              />

              <FilterWrapper
                onClick={(key, checked) => onClick("fee", key, checked)}
                data={{
                  data: Object.values(
                    filterList["internation_fees_range"] || {}
                  ),
                  name: "Fee",
                  key: "fee"
                }}
                filters={filterWithLabel?.filter((a) => a.key === "fee")}
              />

              <FilterWrapper
                onClick={(key, checked) => onClick("study_mode", key, checked)}
                data={{
                  data: Object.values(filterList["study_mode_count"] || {}),
                  name: "Study Mode",
                  key: "study_mode"
                }}
                filters={filterWithLabel?.filter((a) => a.key === "study_mode")}
              />
              <FilterWrapper
                onClick={(key, checked) => onClick("study_load", key, checked)}
                data={{
                  data: Object.values(filterList["study_load_count"] || {}),
                  name: "Study Load",
                  key: "study_load"
                }}
                filters={filterWithLabel?.filter((a) => a.key === "study_load")}
              />
              <div className="clear-filters"></div>
            </CardBody>
          </Card>
        </div>
      ) : null}
    </FilterSkeleton>
  );
};
export default SideFilter;

const FilterWrapper = ({
  onClick,
  data: { key, name, data },
  filters,
  compareKey = ""
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const isFee = key === "fee";

  return (
    <div className="filter-categories">
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="filter-category-title d-flex bg-primary"
      >
        <h6 className="filter-title mb-0">
          {isFee ? `${name}(per year)` : name}
        </h6>
        {collapsed ? (
          <ChevronRight role="button" />
        ) : (
          <ChevronDown role="button" />
        )}
      </div>

      <ul
        className="list-unstyled categories-list"
        style={{ display: collapsed ? "none" : "" }}
      >
        {(isFee ? data : data?.sort(sortThis("key")))?.map((f, idx) => (
          <SubSideNav
            f={f}
            key={`filter-row-${idx}`}
            keyy={key}
            filters={filters}
            compareKey={compareKey}
            onClick={onClick}
            collapsed={collapsed}
          />
        ))}
      </ul>
      <hr className={`divider ${collapsed ? "mt-1" : ""}`} />
    </div>
  );
};

const SubSideNav = ({
  f: {
    reverse_country_count,
    doc_count,
    city_count = undefined,
    sub_category_count = undefined,
    to = undefined,
    from = undefined,
    ...rest
  },
  keyy,
  filters,
  onClick,
  compareKey,
  collapsed
}) => {
  const router = useRouter();
  const { buckets } = city_count || sub_category_count?.category || [];
  const routerQuery = router.query[compareKey]?.toLowerCase();

  const compareWithRouter = (compareKey) => routerQuery === compareKey;

  const isBucketChecked = buckets?.some(({ key }) =>
    compareWithRouter(key?.toLowerCase())
  );

  let idc = rest?.key;
  if (keyy === "fee" || keyy === "duration")
    idc = `${from.toFixed()}-${
      typeof to !== "undefined" ? to?.toFixed() : "*"
    }`;

  const isFilterChecked = filters?.some((f) => f.id === rest?.key);

  const isChecked =
    filters?.some((f) => f.key === keyy && f.id === idc) ||
    compareWithRouter(rest?.key?.toLowerCase()) ||
    isBucketChecked;
  const [isOpen, setIsOpen] = useState(isChecked);

  return (
    <li className="align-items-center py-25 text-primary">
      <span className="d-flex justify-content-between">
        <span className="d-flex">
          <Checkbox
            id={`${Math.random()}-${rest?.key || keyy}`}
            onChange={({ target: { checked } }) => {
              onClick(idc, checked);
              setIsOpen(!isOpen);
            }}
            labelClass={`trm-hv-1 pointer ${isChecked ? "text-secondary" : ""}`}
            color="seconday"
            label={
              keyy === "duration"
                ? rest?.key === "4.0-8.0"
                  ? "More than 4 years"
                  : rest?.key
                : keyy === "fee"
                ? rest?.key === "40000.0-100000.0"
                  ? "More than 40,000"
                  : rest?.key
                : rest?.key
            }
            checked={isChecked || isOpen}
            className="filter-checkbox"
          />
          <span className="secondary text-secondary">
            &nbsp;(
            {reverse_country_count
              ? reverse_country_count.doc_count
              : doc_count}
            )
          </span>
        </span>
        {buckets?.length ? (
          isChecked || isOpen ? (
            <ChevronDown onClick={(_) => setIsOpen(!isOpen)} role="button" />
          ) : (
            <ChevronRight onClick={(_) => setIsOpen(!isOpen)} role="button" />
          )
        ) : null}
      </span>
      {(buckets?.length && isChecked) || isOpen ? (
        <ul
          className="categories-list list-unstyled"
          style={{
            display: collapsed ? "none" : "",
            fontSize: 15,
            marginTop: 0
          }}
        >
          {isFilterChecked || isBucketChecked || isOpen
            ? buckets?.map(({ key, doc_count }, idx) => {
                const isChecked =
                  filters?.some((f) => f.id?.split("-")[0] === key) ||
                  compareWithRouter(key?.toLowerCase());
                return (
                  <span
                    className="d-flex pointer trm-hv-1"
                    key={`filter-row-sub-cat-${idx}`}
                  >
                    <Checkbox
                      id={`${key}-${idx + 1}`}
                      onChange={({ target: { checked } }) =>
                        onClick(`${key}---`, checked)
                      }
                      color="seconday"
                      label={key}
                      checked={isChecked}
                      className="filter-checkbox"
                      labelClass={`trm-hv-1 pointer ${
                        isChecked ? "text-secondary" : ""
                      }`}
                    />
                    <span className="text-secondary">&nbsp;({doc_count})</span>
                  </span>
                );
              })
            : null}
        </ul>
      ) : null}
    </li>
  );
};
