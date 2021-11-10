import React from "react";

import { QuickFact } from "./CourseQuickFact";
import { formatCurrency } from "src/utilities/CurrencyUtil";
import { Table } from "reactstrap";

import { Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import getDurationType from "src/utilities/durationUtil";

export const AcademicRequirements = ({ education_requirement = [] }) => (
  <div className="english-requirement">
    <h4>Academic requirements</h4>
    <div className="academic english-requirement-container">
      {education_requirement?.map((requirement, idx) => (
        <div className="card-content" key={`academic-requirement-${idx}`}>
          <div className="main-content">
            <div className="score-label-container">
              <span className="Text">
                <span className="Heading">
                  {requirement?.degree_level__name}
                </span>
              </span>
            </div>
            <div className="ScoreInformationContainer">
              <div className="ScoreContainer">
                <div className="Score">
                  <span>{requirement?.academic_score || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const OtherTests = ({ other_test = [] }) =>
  other_test?.length ? (
    <article className="english-requirement">
      <h4>Other Tests</h4>
      <div className="english-requirement-container">
        <Table borderless>
          <thead>
            <tr>
              <th></th>
              {other_test?.map((ot, idx) => (
                <th key={idx}>{ot?.test_name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Overall: </th>
              {other_test?.map((ot, idx) => (
                <td key={idx}>
                  <span className="overall">{ot?.score || "N/A"}</span>
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    </article>
  ) : null;

export const OtherRequirements = ({ other_requirements }) => (
  <div className="english-requirement">
    <h4>Other requirements</h4>
    <div
      className="other english-requirement-container"
      dangerouslySetInnerHTML={{
        __html: other_requirements?.requirement,
      }}
    />
  </div>
);

export const FeesAndFunding = ({ fee }) => (
  <div style={{ display: "flex", justifyContent: "space-around" }}>
    <QuickFact
      label={`International ${fee?.fee_year?((fee?.fee_year)):('')}`}
      title={
        <>
          {fee?.international ? (
            <>
              {formatCurrency(fee?.international, fee?.currency__name)} /
              {getDurationType(fee?.per_fee)}
            </>
          ) : (
            "N/A"
          )}
          &nbsp;
          <Tooltip
            title="Fee May varies visit the official programme websites for recent update. "
            color="#1C599F"
          >
            <ExclamationCircleOutlined />
          </Tooltip>
        </>
      }
    />
    <QuickFact
      label={`Domestic ${fee?.fee_year?((fee?.fee_year)):('')}`}
      title={
        <>
          {fee?.domestic ? (
            <>
              {formatCurrency(fee?.domestic, fee?.currency__name)}/
              {getDurationType(fee?.per_fee)}
            </>
          ) : (
            "N/A"
          )}
          &nbsp;
          <Tooltip
            title="Fee May varies visit the official programme websites for recent update. "
            color="#1C599F"
          >
            <ExclamationCircleOutlined />
          </Tooltip>
        </>
      }
    />
  </div>
);
