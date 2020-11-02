import React, { useState, useEffect, Fragment } from "react";
import "../App.css";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    textDecoration: "none",
    flexGrow: 1,
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

function Song({ match, location }) {
  const [songId, setSongId] = useState(match.params.id);
  const [songData, setSongData] = useState(null);
  const [songsList, setSongsList] = useState([]);
  const qureyArr = useState(location.search.substr(1).split("="))[0];

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/song/${songId}`)
      .then((response) => {
        setSongData(response.data);
        getSongsList();
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const getSongsList = () => {
    let url;
    if (qureyArr.length > 1) {
      url = `/${qureyArr[0]}/${qureyArr[1]}`;
    } else {
      url = `/top_songs`;
    }
    axios
      .get(url)
      .then((response) => {
        if (response.data.songs) {
          setSongsList(response.data.songs);
        } else {
          setSongsList(response.data);
        }
        console.log(songsList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      {songData && (
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} md={6}>
            <div className={classes.section}>
              <Typography color="textPrimary" variant="h2">
                {songData.title}
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {songData.artist_name}
              </Typography>
              <Typography color="textPrimary" variant="h6">
                {songData.album_title}
              </Typography>
            </div>
            <div className={classes.section}>
              <iframe
                src={`https://www.youtube.com/embed/${songData.youtube_id}`}
                width="560"
                height="315"
                frameborder="0"
                title={songData.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className={classes.section}>
              <Typography color="textPrimary" variant="h6">
                Length: {songData.length}
              </Typography>
            </div>
            <div className={classes.section}>
              <Typography color="textPrimary" variant="h6">
                Lyrics:
              </Typography>
              <Typography color="textPrimary" variant="body">
                {songData.lyrics}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={10} md={5}>
            <Typography color="textPrimary" variant="h6">
              Songs:
            </Typography>
            <List component="nav" className={classes.root}>
              {songsList.map((song) => {
                return (
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/song/${song.id}`}
                    key={song.id}
                    onClick={() => {
                      setSongId(song.id);
                    }}
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
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
}

export default Song;
