import React from "react";
import { Route, Switch, NavLink} from "react-router-dom";

import Results from "../components/results/results-page";
import Nav from "../components/nav/nav";
import Landing from "../components/landing/landing-page";
import About from "../components/about/about-content";
import Itinerary from "../components/itinerary/itinerary";
import RouteDetails from "../components/route-details/route-details";
import Team from "../components/team/team";
import "./app.css";
import NotFound from "../components/not-found/not-found"

const App = () => (
  <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/results" component={Results} />
      <Route path="/about" component={About} />
      <Route path="/itinerary" component={Itinerary} />
      <Route path="/itinerary/:itinItem" component={Itinerary} />
      <Route path="/route-details/:routeID" component={RouteDetails} />
      <Route path="/team" component={Team} />
      <Route component={NotFound}  />
    </Switch>
  </div>
);

export default App;
