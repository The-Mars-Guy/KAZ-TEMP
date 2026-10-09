// src/components/Button.jsx
// Reusable button/link. Renders a router Link, an external anchor, or a
// native <button> depending on the props supplied.

import React from "react";
import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  ghost: "btn--ghost",
  gold: "btn--gold",
};

const SIZES = {
  sm: "btn--sm",
  lg: "btn--lg",
};

export default function Button({
  children,
  to,
  href,
  variant = "primary",
  size,
  block = false,
  type = "button",
  disabled = false,
  className = "",
  ...rest
}) {
  const classes = [
    "btn",
    VARIANTS[variant] || VARIANTS.primary,
    size ? SIZES[size] : "",
    block ? "btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
