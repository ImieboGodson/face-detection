import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';


const Logo = () => {
	return (
		<Tilt className="Tilt br3 shadow-1 ma4 mt0" options={{ max : 50 }} style={{ height: 100, width: 100 }} >
		 <div className="Tilt-inner"> <img alt='Logo' src={brain} /> </div>
		</Tilt>
	)
}

export default Logo;