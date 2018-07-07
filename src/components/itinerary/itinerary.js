import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./itinerary.css";
import axios from 'axios';
import { connect } from 'react-redux';
import { setItineraryItem } from '../../actions';
import { setSelectedItineraryItem } from '../../actions';
import Card from './card';

class Itinerary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itineraryItems: {},
    }
   
  }
  componentDidMount() {
    const { itinItem } = this.props.match.params
  }

  render() {
    console.log('props', this.props)
    return (

      <div className="centered">
        <div className="itinerary-title">
          <h1>Itinerary</h1>
        </div>
        <section className="cards">
          {this.props.routes.map((route, index) => <Card key={index} route = {route}/>)}
        </section>
        <input type="email" placeholder="email address" />
        <button>Send My intinerary</button>
      </div>
    );

  }
}


function mapStateToProps(state) {
  console.log('state:', state)
  const itineraryInfo = state.itinerary.routes;
  return {
    routes: itineraryInfo
  }

}

export default connect(mapStateToProps)(Itinerary)
