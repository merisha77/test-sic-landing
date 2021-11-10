import React from "react";
import { ChevronsRight } from "react-feather";

import { Table } from "reactstrap";

const EnglishTestWrapper = ({ requirements = [] }) => {
  const handleSlide = (_) => {
    const tbl = document.getElementsByClassName("table-responsive");
    if (tbl.length) {
      tbl[0].scroll({ left: "400", behavior: "smooth" });
    }
  };

  return requirements?.length ? (
    <article className="english-requirement">
      <h4>English requirements</h4>

      <div className="english-requirement-container">
        <span className="col-12 d-flex justify-content-end">
          <div className="d-lg-none ">
            <ChevronsRight onClick={handleSlide} />
          </div>
        </span>
        <Table
          borderless
          style={{ textAlign: "center" }}
          responsive
          className="t"
        >
          <thead>
            <tr>
              <th></th>
              <th>Reading</th>
              <th>Writing</th>
              <th>Listening</th>
              <th>Speaking</th>
              <th>Overall</th>
            </tr>
          </thead>
          <tbody>
            {requirements?.map((requirement, idx) => (
              <tr key={`english-requirement-${idx}`}>
                <th scope="row">
                  <div className="score-label-container">
                    {/* <img  loading="lazy"
                    src={language}
                    alt={requirement?.name__name}
                    loading="lazy"
                    width="40"
                    height="40"
                  /> */}
                    <span className="Text">
                      <span className="Heading text-primary">
                        &nbsp; {requirement?.name__name}
                      </span>
                    </span>
                  </div>
                </th>
                <td>{requirement?.reading || "N/A"}</td>
                <td>{requirement?.writing || "N/A"}</td>
                <td>{requirement?.listening || "N/A"}</td>
                <td>{requirement?.speaking || "N/A"}</td>
                <td>
                  <span className="overall">
                    {requirement?.overall_score || "N/A"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </article>
  ) : null;
};
export default EnglishTestWrapper;
