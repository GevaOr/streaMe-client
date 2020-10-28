import React from "react";
import "../App.css";
// import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

function TopCard(props) {
  // useEffect(() => {}, []); // axios

  return (
    <GridListTile key={props.id}>
      <img src={props.imgUrl} alt={props.title} />
      <GridListTileBar title={props.title} subtitle={`by: ${props.creator}`} />
    </GridListTile>
  );
}

export default TopCard;
