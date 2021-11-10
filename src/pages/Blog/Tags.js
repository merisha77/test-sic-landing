import React from "react";
import Link from "next/link";

const Tags = ({ tags }) => (
  <div className="widget mb-4 pb-2">
    <h4 className="widget-title">Tags Cloud</h4>
    <div className="tagcloud mt-4">
      {tags?.map((tag, idx) => (
        <a key={`tag-${idx}`} className="rounded">
          {tag}
        </a>
      ))}
    </div>
  </div>
);

export default Tags;
