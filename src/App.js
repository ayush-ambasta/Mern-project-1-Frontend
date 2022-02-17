import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Home} from "./components/Home"
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { PagenotFound } from "./components/PagenotFound";
import { Profile } from "./components/Profile";
import { Signup } from "./components/Signup";


function App() {
  return (
      <>
      <Router>
       <Navbar/>
       <Switch>
       <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/profile/:id">
          <Profile/>
        </Route>
        <Route exact path="/signup">
          <Signup/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route>
          <PagenotFound/>
        </Route>
        </Switch>
    </Router>
    </>
  );
}

export default App;
