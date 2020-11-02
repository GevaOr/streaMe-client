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

function Artist({ match }) {
  const artistId = useState(match.params.id)[0];
  const [artistData, setArtistData] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    if (!artistData) {
      axios
        .get(`/artist/${artistId}`)
        .then((response) => {
          let data = response.data;
          setArtistData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [artistData, artistId]);

  return (
    <Fragment>
      {artistData && (
        <Fragment>
          <div className={classes.section}>
            <Typography color="textPrimary" variant="h2">
              {artistData.artist_name}
            </Typography>
            <img
              src={artistData.cover_img}
              alt={artistData.artist_name}
              width="600px"
            />
          </div>
          {artistData.albums.length > 0 && (
            <div className={classes.section}>
              <Typography color="textPrimary" variant="h4">
                Albums
              </Typography>
              <List component="nav" className={classes.root}>
                {artistData.albums.map((album) => {
                  return (
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/album/${album.id}`}
                      key={album.id}
                    >
                      <ListItem button>
                        <ListItemText primary={album.title} />
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </div>
          )}
          {artistData.songs.length > 0 && (
            <div className={classes.section}>
              <Typography color="textPrimary" variant="h4">
                Songs
              </Typography>
              <List component="nav" className={classes.root}>
                {artistData.songs.map((song) => {
                  return (
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/song/${song.id}?artist=${artistId}`}
                      key={song.id}
                    >
                      <ListItem button>
                        <ListItemText primary={song.title} />
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

export default Artist;
