import "./App.css";

import Album from "./components/Album";
import Artist from "./components/Artist";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Playlist from "./components/Playlist";
import Song from "./components/Song";

import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/song/:id" component={Song} />
        <Route path="/artist/:id" component={Artist} />
        <Route path="/album/:id" component={Album} />
        <Route path="/playlist/:id" component={Playlist} />
      </Switch>
    </Router>
  );
}

export default App;
