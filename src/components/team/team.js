import React, { Component } from 'react';
import './team.css';
import github from '../../assets/images/github.svg';
import linkedin from '../../assets/images/linkedin.svg';
import blank from '../../assets/images/blank.png';
import jphoto from '../../assets/images/jphoto.jpg';
import schun from '../../assets/images/schun.jpg';
import plujan from '../../assets/images/plujan.jpeg';
import aghanimati from '../../assets/images/aghanimati.jpg';
import apark from '../../assets/images/apark.jpg';
import dparker from '../../assets/images/danphoto.jpg';
import briefcase from '../../assets/images/icons/briefcase-solid.svg'
import folder from '../../assets/images/icons/folder-open-solid.svg'

export default class Team extends Component {

    render() {
        return (
            <div className="team-page-container">
                <h1 className='team-title'>Meet the Team</h1>
                <div className="team">
                    <div className="member">
                        <img src={dparker} alt="" />
                        <h2>Dan</h2>
                        <h3>Frontend</h3>
                        <p>
                        <a href='https://github.com/dangaparker/' target="_blank">
                                <img className="linkedin-git-icon" src={github} alt="" />
                            </a>
                            <a href='https://www.linkedin.com/in/daniel-parker-15887a91/' target="_blank">
                                <img className="linkedin-git-icon" src={linkedin} alt="" />   
                            </a>
                            <a href="http://dangaparker.com" target="_blank">
                                <img className="folder-icon" src={folder} alt=""/>
                            </a>
                        </p>
                    </div>
                    <div className="member">
                        <img src={plujan} alt="" />
                        <h2>Paul</h2>
                        <h3>Backend</h3>
                        <p>
                            <a href='https://github.com/PaulGLujan' target="_blank">
                                <img className="linkedin-git-icon" src={github} alt="" />
                            </a>
                            <a href='https://www.linkedin.com/in/paullujan/' target="_blank">
                                <img className="linkedin-git-icon" src={linkedin} alt="" />   
                            </a>
                            <a href="http://paulglujan.com/" target="_blank">
                                <img className="folder-icon" src={folder} alt=""/>
                            </a>
                        </p>
                    </div>
                    <div className="member">
                        <img src={apark} alt="" />
                        <h2>Aaron</h2>
                        <h3>Backend</h3>
                        <p>
                            <a href='https://github.com/MjMajorMajorMj' target="_blank">
                                <img className="linkedin-git-icon" src={github} alt="" />
                            </a>
                            <a href='https://www.linkedin.com/in/aaron-c-park/' target="_blank">
                                <img className="linkedin-git-icon" src={linkedin} alt="" />   
                            </a>
                            <a href="https://aaroncpark.com/" target="_blank">
                                <img className="folder-icon" src={folder} alt=""/>
                            </a>
                        </p>
                    </div>
                    <div className="member">
                        <img src={schun} alt="" />
                        <h2>Sarah</h2>
                        <h3>Frontend</h3>
                        <p>
                            <a href='https://github.com/schun92' target="_blank">
                                <img className="linkedin-git-icon" src={github} alt="" />
                            </a>
                            <a href='https://www.linkedin.com/in/sarah-chun-347081160/' target="_blank">
                                <img className="linkedin-git-icon" src={linkedin} alt="" />   
                            </a>
                            <a href="http://sarahschuncodes.com/" target="_blank">
                                <img className="folder-icon" src={folder} alt=""/>
                            </a>
                        </p>
                    </div>
                    <div className="member">
                        <img src={aghanimati} alt="" />
                        <h2>Amin</h2>
                        <h3>backend</h3>
                        <p>
                            <a href='https://github.com/AlmondoG' target="_blank">
                                <img className="linkedin-git-icon" src={github} alt="" />
                            </a>
                            <a href='https://www.linkedin.com/in/amin-ghanimati-a26710147/' target="_blank">
                                <img className="linkedin-git-icon" src={linkedin} alt="" />   
                            </a>
                            <a href="https://aghanimati.com/" target="_blank">
                                <img className="folder-icon" src={folder} alt=""/>
                            </a>
                        </p>
                    </div>
                    <div className="member">
                        <img src={jphoto} alt="" />
                        <h2>Jhon</h2>
                        <h3>Frontend</h3>
                        <p>
                            <a href='https://github.com/jhonalino' target="_blank">
                                <img className="linkedin-git-icon" src={github} alt="" />
                            </a>
                            <a href='https://www.linkedin.com/in/jhonalino/' target="_blank">
                                <img className="linkedin-git-icon" src={linkedin} alt="" />   
                            </a>
                            <a href="http://jhonalino.com/" target="_blank">
                                <img className="folder-icon" src={folder} alt=""/>
                            </a>
                        </p>
                    </div>
                </div>
                <div className="shout-out-container">
                    <p className="shout-out-text">With special thanks to graphic designer, Annabel Parker, and our mentors: Dan Paschal and Cody Miller.</p>
                </div>
            </div>
        )
    }
}