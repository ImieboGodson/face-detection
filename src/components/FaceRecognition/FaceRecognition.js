import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ imageUrl, faceBox }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={imageUrl} width='600px' height='auto'/>
				<div className='boundingBox' style={{top: faceBox.topBorder, left: faceBox.leftBorder, right: faceBox.rightBorder, bottom: faceBox.bottomBorder}}></div>
			</div>
			
		</div>
	)
}

export default FaceRecognition;