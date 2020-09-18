import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
