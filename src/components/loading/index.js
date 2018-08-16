import React from 'react';
import './loading.css';


const Loading = props => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
   </div> 
  )
}

export default Loading;
