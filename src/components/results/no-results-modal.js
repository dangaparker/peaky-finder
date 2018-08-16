import React, { Component } from 'react';
import './no-results-modal.css';
import {NavLink} from 'react-router-dom';

class NoResults extends Component {
   
    render() {

        return (
            <div className='no-results-outer-modal'>
                <div className='no-results-inner-modal'>
                    <h1 className="no-results-text">{this.props.text}</h1>
                    <NavLink to="/" className="btn is-secondary">back to search</NavLink>
                </div>
            </div>
        )
    }
}

export default NoResults;

