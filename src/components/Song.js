import React, { useState, useEffect, Fragment } from "react";
import "../App.css";
import axios from "axios";
import { Typography } from "@material-ui/core";

function Song({ match }) {
  const [songId, setSongId] = useState(match.params.id);

  useEffect(() => {}, []); // axios

  return (
    <Fragment>
      <Typography color="textPrimary" variant="h1">
        SONG PAGE
      </Typography>
    </Fragment>
  );
}

export default Song;
