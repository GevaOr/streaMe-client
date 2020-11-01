import React, { useState, useEffect, Fragment } from "react";
import "../App.css";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    textDecoration: "none",
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
  const [songsData, setSongsData] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/playlist/${playlistId}`)
      .then((response) => {
        setPlaylistData(response.data[0]);
        getSongsData();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getSongsData = () => {
    axios
      .get(`/playlist/${playlistId}/songs`)
      .then((responseList) => {
        for (let item of responseList.data) {
          axios
            .get(`/song/${item.song_id}`)
            .then((songResponse) => {
              let currentSong = {
                id: item.song_id,
                youtubeId: songResponse.data[0].youtube_id,
              };
              if (songsData) {
                let currentData = songsData;
                currentData.push(currentSong);
                setSongsData(currentData);
              } else {
                setSongsData([currentSong]);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <Typography color="textPrimary" variant="h6">
              {playlistData.created_at.slice(0, 10)}
            </Typography>
          </div>
          <div className={classes.section}>
            <img src={playlistData.cover_img} width="600px" />
          </div>
          {songsData && (
            <div className={classes.section}>
              <Typography color="textPrimary" variant="h4">
                Songs
              </Typography>
              <List component="nav" className={classes.root}>
                {songsData.map((song) => {
                  let embUrl = `https://www.youtube.com/embed/${song.youtubeId}`;
                  return (
                    <ListItem key={song.id}>
                      <iframe
                        src={embUrl}
                        allowFullScreen
                        frameBorder="0"
                      ></iframe>
                    </ListItem>
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