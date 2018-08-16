import React, { Component } from 'react';
import HtmlCssJs from '../../assets/images/html-css-js-icon.png';
import ReactRedux from '../../assets/images/react-redux-icon.png';
import Php from '../../assets/images/php_mysql.png';
import background from '../../assets/images/resizedAboutImage.jpg';
import './about-content.css'

class About extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="about-page">
                <div className="img-wrapper">
                    <img className="top-img" src={background} />
                </div>
                <div className="about-content">
                    <h1 className="about-header">about</h1>
                    <p className="about-text">peaky finder is an application for west coast rock climbers to be able to locate and save different routes into an itinerary to map out a day's worth of climbing!</p>
                    <h3>Technologies used:</h3>
                    <div className="tech-icons">
                        <div>
                            <img src={HtmlCssJs} alt="html css javascript icons" />
                            <img className="react-redux-icon" src={ReactRedux} alt="react redux icon" />
                            <img className="react-redux-icon" src={Php} alt="php, mysql icon" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;

// Photo by Casey Horner on Unsplash