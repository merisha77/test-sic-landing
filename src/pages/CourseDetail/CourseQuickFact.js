import React from "react";
import { Send, Clock, Calendar } from "react-feather";

import useWidth from "src/utilities/widthUtil";
import { formatCurrency } from "src/utilities/CurrencyUtil";

const CourseQuickFact = ({
  duration,
  fee,
  currency,
  apply_date,
  start_date,
  feeDuration,
  isMobile,
}) => {
  return duration || fee || apply_date || start_date ? (
    <section
      className='qck-fct-wrapper col col-md-10'
      style={{ padding: `${isMobile ?? "10px 0"}` }}
    >
      <div className='qck-fct-content row'>
        {duration && (
          <QuickFact label='Duration' title={duration} Icon={Clock} />
        )}
        {fee && (
          <QuickFact
            label='Tuition Fee'
            title={`${formatCurrency(fee, currency)}${
              fee && !!feeDuration ? "/" + feeDuration : ""
            }`}
          />
        )}
        {apply_date && (
          <QuickFact label='Apply Date' title={apply_date} Icon={Send} />
        )}
        {start_date && (
          <QuickFact label='Intake' title={start_date} Icon={Calendar} />
        )}
      </div>
    </section>
  ) : (
    ""
  );
};

export default CourseQuickFact;

export const QuickFact = ({ label, title, Icon }) => {
  const { isMobile, isTablet } = useWidth();
  return (
    <div className="qck-fct col-lg-3 col-md-6 col-sm-6 col-6 trm-hv px-1">
      <div className="icon text-primary">
        {!!Icon ? (
          <Icon size={isMobile ? 20 : isTablet ? 25 : 30} />
        ) : (
          <svg
            style={{
              height: isMobile ? 20 : isTablet ? 25 : 30,
              width: "auto"
            }}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z"
            />
          </svg>
        )}
      </div>
      <div className="fct-label-container">
        <div className="fct-title text-muted">{title}</div>
        <div className="fct-label text-secondary"> {label} </div>
      </div>
    </div>
  );
};
