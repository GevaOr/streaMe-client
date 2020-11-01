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
  const [albumsData, setAlbumsData] = useState(null);
  const [songsData, setSongsData] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/artist/${artistId}`)
      .then((response) => {
        setArtistData(response.data[0]);
        getAlbumsData();
        getSongsData();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAlbumsData = () => {
    axios
      .get(`/artist/${artistId}/albums`)
      .then((responseList) => {
        for (let item of responseList.data) {
          axios
            .get(`/album/${item.album_id}`)
            .then((albumResponse) => {
              let currentAlbum = {
                id: item.album_id,
                title: albumResponse.data[0].title,
              };
              if (albumsData) {
                let currentData = albumsData;
                currentData.push(currentAlbum);
                setAlbumsData(currentData);
              } else {
                setAlbumsData([currentAlbum]);
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

  const getSongsData = () => {
    axios
      .get(`/artist/${artistId}/songs`)
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
      {artistData && (
        <Fragment>
          <div className={classes.section}>
            <Typography color="textPrimary" variant="h2">
              {artistData.artist_name}
            </Typography>
            <img src={artistData.cover_img} width="600px" />
          </div>
          {albumsData && (
            <div className={classes.section}>
              <Typography color="textPrimary" variant="h4">
                Albums
              </Typography>
              <List component="nav" className={classes.root}>
                {albumsData.map((album) => {
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
                      {/* <ListItemText primary={song.title} /> */}
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

export default Artist;
