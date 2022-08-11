import React from 'react';
import Form from '../Form/Form';


class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userEmail: '',
			userPassword: '',
		}
	}

	onEmailChange = (e) => {
		this.setState({ userEmail: e.target.value });
	}

	onPasswordChange = (e) => {
		this.setState({ userPassword: e.target.value });
	}

	onFormSubmit = () => {
		const { userEmail, userPassword } = this.state;
		const serverUrl = 'https://limitless-scrubland-32338.herokuapp.com/login';
		const validEmail = userEmail.includes('@') && userEmail.includes('.com');

		if(userEmail === '' || userPassword === '') {
			console.log("You Can't Leave Input Fields Empty");
		} else if (validEmail) {
			fetch(serverUrl, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: userEmail,
					password: userPassword,
				})
			})
			.then(response => response.json())
			.then(user => {
				if(user.id) {
					this.props.onRouteChange('home');
					this.props.loadUser(user);
					// console.log('Login route', user);
				} else {
					console.log('Wrong Credentials');
				}
			})
			.catch(err => {
				console.log('Error Fetching User');
			})
		} else {
			console.log('Enter a valid email address');
		}
	}


	render () {
		const { onRouteChange } = this.props;
		return (
			<Form onRouteChange={onRouteChange} formType={'signin'} onEmailChange={this.onEmailChange} onPasswordChange={this.onPasswordChange} onFormSubmit={this.onFormSubmit} />
		)
	}
	
}

export default SignIn;