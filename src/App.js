import "./App.css";

import Album from "./components/Album";
import Artist from "./components/Artist";
import Home from "./components/Home";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import Playlist from "./components/Playlist";
import Song from "./components/Song";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Router>
      <Nav />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/artist/:id" component={Artist} />
          <Route exact path="/album/:id" component={Album} />
          <Route exact path="/playlist/:id" component={Playlist} />
          <Route exact path="/song/:id" component={Song} />
          <Route component={NotFound} />
        </Switch>
      </Wrapper>
    </Router>
  );
}

export default App;
