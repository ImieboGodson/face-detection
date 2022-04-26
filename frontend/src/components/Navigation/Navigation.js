import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	
	if (isSignedIn) {
		return (
			<nav style={{padding: '5px 20px', display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('SignIn')} className='fa3 link dim black underline pa3 pointer'>Sign Out</p>
			</nav>
		)
	} else {
		return (
			<nav style={{padding: '5px 20px', display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('Register')} className='fa3 link dim black underline pa3 pointer'>Register</p>
				<p onClick={() => onRouteChange('SignIn')} className='fa3 link dim black underline pa3 pointer'>Sign In</p>
			</nav>
		)
	}
	
}


export default Navigation;