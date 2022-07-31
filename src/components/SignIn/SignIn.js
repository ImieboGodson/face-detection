import React from 'react';


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
		const serverUrl = 'http://localhost:8000/login';
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
					console.log('Login route', user);
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
			<article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="email" name="email-address"  id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="password" name="password"  id="password"/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={this.onFormSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
				    </div>
				    <div className="lh-copy mt3">
				      <p>New here?<span onClick={() => onRouteChange('Register')} className="f6 link dim black db underline pointer">Register</span></p>
				    </div>
				  </div>
				</main>
			</article>
		)
	}
	
}

export default SignIn;