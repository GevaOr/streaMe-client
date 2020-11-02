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
}));

function Playlist({ match }) {
  const playlistId = useState(match.params.id)[0];
  const [playlistData, setPlaylistData] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/playlist/${playlistId}`)
      .then((response) => {
        setPlaylistData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [playlistId]);

  return (
    <Fragment>
      {playlistData && (
        <Fragment>
          <div className={classes.section}>
            <Typography color="textPrimary" variant="h2">
              {playlistData.title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {playlistData.created_by}
            </Typography>
            <Typography color="textPrimary" variant="body">
              {playlistData.created_at.slice(0, 10)}
            </Typography>
          </div>
          <div className={classes.section}>
            <img
              src={playlistData.cover_img}
              alt={playlistData.title}
              width="600px"
            />
          </div>
          {playlistData.songs && (
            <div className={classes.section}>
              <Typography color="textPrimary" variant="h4">
                Songs
              </Typography>
              <List component="nav" className={classes.root}>
                {playlistData.songs.map((song) => {
                  return (
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/song/${song.id}?playlist=${playlistData.id}`}
                      key={song.id}
                    >
                      <ListItem button>
                        <ListItemText
                          primary={`${song.title} by ${song.artist_name}`}
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

export default Playlist;
