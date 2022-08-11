import React from 'react';
import Form from '../Form/Form';


class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			userEmail: '',
			userPassword: '',
		}
	}

	onNameChange = (e) => {
		this.setState({ userName: e.target.value });
	}

	onEmailChange = (e) => {
		this.setState({ userEmail: e.target.value });
	}

	onPasswordChange = (e) => {
		this.setState({ userPassword: e.target.value });
	}

	onFormSubmit = () => {
		const {userName, userEmail, userPassword } = this.state;
		const validEmail = userEmail.includes('@') && userEmail.includes('.com');

		if(userName === '' || userEmail === '' || userPassword === '') {
			console.log("You Can't Leave Input Fields Empty");
		} else if (validEmail) {
			fetch('https://limitless-scrubland-32338.herokuapp.com/register', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					name: userName,
					email: userEmail,
					password: userPassword,
				})
			})
			.then(response => response.json())
			.then(user => {
				if(user.id) {
					// console.log('register route', user);
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			})
			.catch(err => {
				console.log(err);
			})
		} else {
			console.log('Enter a valid email address');
		}
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<Form onRouteChange={onRouteChange} formType={'register'} onNameChange={this.onNameChange} onEmailChange={this.onEmailChange} onPasswordChange={this.onPasswordChange} onFormSubmit={this.onFormSubmit} />
		)
	}
	
}

export default Register;