import { Breadcrumbs, Link as BreadcrumbsLink } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { END_POINTS } from "../../constants/endpoints";
import NeedsAddCreditDialog from "./NeedsAddCreditDialog";

function NeedsNavbar(props: { currentPage: string; availableCredits: number }) {
  return (
    <div
      className={`flex w-full justify-between border-b border-gray-400 px-3 py-4`}
    >
      <Breadcrumbs
        className="!text-xs"
        separator={
          <ArrowForwardIosIcon
            sx={{
              width: 8,
            }}
          />
        }
      >
        <BreadcrumbsLink
          color="inherit"
          underline="none"
          href={END_POINTS.DASHBOARD}
        >
          Dashboard
        </BreadcrumbsLink>
        <BreadcrumbsLink
          underline="none"
          color="inherit"
          href={END_POINTS.NEEDS}
        >
          {props.currentPage}
        </BreadcrumbsLink>
      </Breadcrumbs>

      <NeedsAddCreditDialog availableCredits={props.availableCredits} />
    </div>
  );
}

export default NeedsNavbar;
