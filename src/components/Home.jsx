import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import "../App.css";

import Carousel from "react-elastic-carousel";
import TopCard from "./TopCard";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  topCarousel: {
    marginBottom: "20px",
    marginTop: "10px",
    borderRadius: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: "100%",
    textAlign: "center",
    padding: "5px 10px",
  },
}));

function Home() {
  const breakPoints = [
    { width: 0, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 800, itemsToShow: 4 },
    { width: 960, itemsToShow: 5 },
    { width: 1280, itemsToShow: 7 },
    { width: 1920, itemsToShow: 10 },
  ];

  const [topSongs, setTopSongs] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topAlbums, setTopAlbums] = useState(null);
  const [topPlaylists, setTopPlaylists] = useState(null);
  const [topCategories, setTopCategories] = useState([
    "top_songs",
    "top_albums",
    "top_artists",
    "top_playlists",
  ]);

  useEffect(() => {
    for (let category of topCategories) {
      getTopMedia(category);
    }
  }, []);

  const getTopMedia = (category) => {
    let url = `/${category}`;
    axios
      .get(url)
      .then((response) => {
        switch (category) {
          case "top_songs":
            setTopSongs(response.data);
            return;
          case "top_albums":
            setTopAlbums(response.data);
            return;
          case "top_artists":
            setTopArtists(response.data);
            return;
          case "top_playlists":
            setTopPlaylists(response.data);
            return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Typography color="textPrimary" variant="h4">
        Top Songs
      </Typography>
      <div className={classes.topCarousel}>
        <Carousel breakPoints={breakPoints}>
          {topSongs ? (
            topSongs.map((song) => {
              return (
                <TopCard
                  key={song.id}
                  id={song.id}
                  type="song"
                  imgUrl={song.cover_img}
                  title={song.title}
                  creator={song.artist_name}
                />
              );
            })
          ) : (
            <Fragment />
          )}
        </Carousel>
      </div>
      <Typography color="textPrimary" variant="h4">
        Top Artists
      </Typography>
      <div className={classes.topCarousel}>
        <Carousel breakPoints={breakPoints}>
          {topArtists ? (
            topArtists.map((artist) => {
              return (
                <TopCard
                  key={artist.id}
                  id={artist.id}
                  type="artist"
                  imgUrl={artist.cover_img}
                  title={artist.artist_name}
                  creator={null}
                />
              );
            })
          ) : (
            <Fragment />
          )}
        </Carousel>
      </div>
      <Typography color="textPrimary" variant="h4">
        Top Albums
      </Typography>
      <div className={classes.topCarousel}>
        <Carousel breakPoints={breakPoints}>
          {topAlbums ? (
            topAlbums.map((album) => {
              return (
                <TopCard
                  key={album.id}
                  id={album.id}
                  type="album"
                  imgUrl={album.cover_img}
                  title={album.title}
                  creator={album.artist_name}
                />
              );
            })
          ) : (
            <Fragment />
          )}
        </Carousel>
      </div>
      <Typography color="textPrimary" variant="h4">
        Top Playlists
      </Typography>
      <div className={classes.topCarousel}>
        <Carousel breakPoints={breakPoints}>
          {topPlaylists ? (
            topPlaylists.map((playlist) => {
              return (
                <TopCard
                  key={playlist.id}
                  id={playlist.id}
                  type="playlist"
                  imgUrl={playlist.cover_img}
                  title={playlist.title}
                  creator={playlist.created_by}
                  createdAt={playlist.created_at}
                />
              );
            })
          ) : (
            <Fragment />
          )}
        </Carousel>
      </div>
    </Fragment>
  );
}

export default Home;
