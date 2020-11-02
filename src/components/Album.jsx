import React, { useState, useEffect, Fragment } from "react";
import "../App.css";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    textDecoration: "none",
    borderRadius: "5px",
  },
  section: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "25px",
  },
  listItem: {
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

function Album({ match }) {
  const albumId = useState(match.params.id)[0];
  const [albumData, setAlbumData] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/album/${albumId}`)
      .then((response) => {
        setAlbumData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [albumId]);

  return (
    <Fragment>
      {albumData && (
        <Fragment>
          <div className={classes.section}>
            <Typography color="textPrimary" variant="h2">
              {albumData.title}
            </Typography>
            <Link
              className={classes.link}
              to={`/artist/${albumData.artist_id}`}
            >
              <Typography color="textPrimary" variant="h4">
                {albumData.artist_name}
              </Typography>
            </Link>
          </div>
          <div className={classes.section}>
            <img
              src={albumData.cover_img}
              alt={albumData.title}
              width="600px"
            />
          </div>
          {albumData.songs && (
            <div className={classes.section}>
              <Typography color="textPrimary" variant="h4">
                Songs
              </Typography>
              <List component="nav" className={classes.root}>
                {albumData.songs.map((song) => {
                  return (
                    <Link
                      className={classes.link}
                      to={`/song/${song.id}?album=${albumData.id}`}
                      key={song.id}
                    >
                      <ListItem button>
                        <ListItemText
                          primary={`${song.track_num}. ${song.title}`}
                        />
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Album;
