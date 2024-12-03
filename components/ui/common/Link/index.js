import React from "react";
import Link from "next/link";

const ActiveLink = ({ children, ...props }) => {
  const className = children.props?.children || "";

  return <Link {...props}>{React.cloneElement(children, { className })}</Link>;
};

// To complete

export default ActiveLink;
