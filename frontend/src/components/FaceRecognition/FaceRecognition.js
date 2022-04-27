import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ imageUrl }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={imageUrl} width='600px' height='auto'/>
				{/*<div className='boundingBox' style={{top: box.topBorder, left: box.leftBorder, right: box.rightBorder, bottom: box.bottomBorder}}></div>*/}
			</div>
			
		</div>
	)
}

export default FaceRecognition;