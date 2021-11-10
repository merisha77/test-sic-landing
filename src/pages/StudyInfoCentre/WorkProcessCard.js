import React from "react";
import { Col } from "reactstrap";
import Link from "next/link";

const WorkProcessCard = ({ description, image, url = "#!" }) => (
  <Col md={12}>
    <Link href={url} prefetch={false}>
      <a>
        <div className="work-process p-0">
          <img  loading="lazy"
            src={`${process.env.NEXT_PUBLIC_MEDIA}${image}`}
            alt="How it works"
            className="round"
          />
          <br/>
          <span className="detail-container">
            <h5 className="p-4">{description}</h5>
          </span>
        </div>
      </a>
    </Link>
  </Col>
);

export default WorkProcessCard;
