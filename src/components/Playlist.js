import React, { useState, useEffect, Fragment } from "react";
import "../App.css";
import axios from "axios";
import { Typography } from "@material-ui/core";

function Playlist({ match }) {
  const [playlistId, setPlaylistId] = useState(match.params.id);

  useEffect(() => {}, []); // axios

  return (
    <Fragment>
      <Typography color="textPrimary" variant="h1">
        PLAYLIST PAGE
      </Typography>
    </Fragment>
  );
}

export default Playlist;
