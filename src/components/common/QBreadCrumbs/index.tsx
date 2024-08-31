import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

type Crumb = { link: string; label: string };

interface QBreadCrumbsProps {
  crumbs: Crumb[];
  underline?: "none" | "hover" | "always";
  className?: string;
  seperator?: React.ReactNode;
}

export default function QBreadCrumbs(props: QBreadCrumbsProps) {
  const breadcrumbs = props.crumbs.map((crumb: Crumb) => {
    return (
      <Link
        underline={props?.underline}
        key={crumb.label}
        href={crumb.link}
        className={props?.className}
        // onClick={handleClick}
      >
        {crumb.label}
      </Link>
    );
  });

  return (
    <Breadcrumbs separator={props?.seperator || "/"} aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  );
}
