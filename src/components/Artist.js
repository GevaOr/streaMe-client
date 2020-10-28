import React, { useState, useEffect, Fragment } from "react";
import "../App.css";
import axios from "axios";

import { Typography } from "@material-ui/core";

function Artist({ match }) {
  const [artistId, setArtistId] = useState(match.params.id);

  useEffect(() => {}, []); // axios

  return (
    <Fragment>
      <Typography color="textPrimary" variant="h1">
        ARTIST PAGE
      </Typography>
    </Fragment>
  );
}

export default Artist;
