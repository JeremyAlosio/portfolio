import React from 'react';
import './AnimatedBackground.css'

const AnimatedBackground = props => (
  <div className="stars">
    <div className="star" id="star_1">
      <div className="star_streak">
        <div className="star_core"></div>
      </div>
    </div>
    <div className="star" id="star_2">
      <div className="star_streak">
        <div className="star_core"></div>
      </div>
    </div>
    <div className="star" id="star_3">
      <div className="star_streak">
        <div className="star_core"></div>
      </div>
    </div>
  </div>

);
export default AnimatedBackground;
