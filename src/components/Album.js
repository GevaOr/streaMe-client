import React, { useState, useEffect, Fragment } from "react";
import "../App.css";
import axios from "axios";
import { Typography } from "@material-ui/core";
function Album({ match }) {
  const [albumId, setAlbumId] = useState(match.params.id);

  useEffect(() => {}, []); // axios

  return (
    <Fragment>
      <Typography color="textPrimary" variant="h1">
        ALBUM PAGE
      </Typography>
    </Fragment>
  );
}

export default Album;
