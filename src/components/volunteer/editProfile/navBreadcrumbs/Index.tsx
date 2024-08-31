import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
// import Link, { LinkProps } from '@mui/material/Link';
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useRouter } from "next/router";

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
  "/inbox": "Inbox",
  "/inbox/important": "Important",
  "/trash": "Trash",
  "/spam": "Spam",
  "/drafts": "Drafts",
};

function ListItemLink(props: ListItemLinkProps) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItem button component={"" as any} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItem>
    </li>
  );
}

// interface LinkRouterProps extends LinkProps {
//   to: string;
//   replace?: boolean;
// }

// function LinkRouter(props: LinkRouterProps) {
//   return <Link {...props} component={RouterLink as any} />;
// }

function Page() {
  const location = useRouter();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <p>Home</p>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <p>{breadcrumbNameMap[to]}</p>
        );
      })}
    </Breadcrumbs>
  );
}

export default function NavBreadcrumbs() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: 360 }}>
      <Page />
      <Box
        sx={{
          bgcolor: "background.paper",
          mt: 1,
        }}
        component="nav"
        aria-label="mailbox folders"
      >
        <List>
          <ListItemLink to="/inbox" open={open} onClick={handleClick} />
          <Collapse component="li" in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItemLink sx={{ pl: 4 }} to="/inbox/important" />
            </List>
          </Collapse>
          <ListItemLink to="/trash" />
          <ListItemLink to="/spam" />
        </List>
      </Box>
    </Box>
  );
}
