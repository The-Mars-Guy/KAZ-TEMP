// src/components/SectionHeading.jsx
// Consistent section intro: optional eyebrow + heading + description.

import React from "react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  as: Tag = "h2",
  id,
  className = "",
}) {
  return (
    <div className={`section-head${center ? " section-head--center" : ""} ${className}`.trim()}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Tag id={id}>{title}</Tag>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
