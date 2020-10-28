import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import "../App.css";

import Carousel from "react-elastic-carousel";
import TopCard from "./TopCard";
import { Typography } from "@material-ui/core";

function Home() {
  // const [data, setData] = useState(null);
  const breakPoints = [
    { width: 0, itemsToShow: 1 },
    { width: 600, itemsToShow: 2 },
    { width: 960, itemsToShow: 4 },
    { width: 1280, itemsToShow: 6 },
    { width: 1920, itemsToShow: 8 },
  ];

  // useEffect(() => {}, []); // axios

  return (
    <Fragment>
      {/* <Carousel breakPoints={breakPoints}>
      </Carousel> */}
      <Typography color="textPrimary" variant="h1">
        HOME PAGE
      </Typography>
    </Fragment>
  );
}

export default Home;
