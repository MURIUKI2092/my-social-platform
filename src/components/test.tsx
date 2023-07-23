import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
export const mainListItems = (
  <React.Fragment>
    <Link to={"/posts"}>
      <ListItemButton>
        <ListItemIcon>
          <AutoStoriesIcon />
        </ListItemIcon>

        <ListItemText primary="Feed" />
      </ListItemButton>
    </Link>
    <Link to={"/myPosts"}>
      <ListItemButton>
        <ListItemIcon>
          <DynamicFeedIcon />
        </ListItemIcon>

        <ListItemText primary="My Posts" />
      </ListItemButton>
    </Link>
    <Link to={"/users"}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>
    <Link to={"/following"}>
      <ListItemButton>
        <ListItemIcon>
          <ImportContactsIcon />
        </ListItemIcon>
        <ListItemText primary="Following" />
      </ListItemButton>
    </Link>
    <Link to={"/profile"}>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset></ListSubheader>
    <Link to={"/payments"}>
      <ListItemButton>
        <ListItemIcon>
          <PaymentIcon />
        </ListItemIcon>
        <ListItemText primary="Premium" />
      </ListItemButton>
    </Link>
    <Link to={"/"}>
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
