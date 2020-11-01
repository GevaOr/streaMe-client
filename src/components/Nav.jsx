import React, { useState, useEffect, Fragment } from "react";

import "../App.css";
import logo from "../media/streame_logo.png";

import { Link } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
// import SearchIcon from "@material-ui/icons/Search";
// import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    // textAlign: "center",
    color: "rgba(255, 255, 255, 0.7)",
    textShadow: "0 0 30px purple",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  logoIcon: {
    padding: "1px",
  },
}));

function Nav() {
  const classes = useStyles();

  // useEffect(() => {}, []); // axios

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.logoIcon}>
            <Link to="/">
              <img src={logo} width="75" />
            </Link>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Just play.
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

// return (
//   <AppBar>
//     <Link href="/">
//       <img src={logo} width="64" />
//     </Link>
//   </AppBar>
// );
// }

export default Nav;
