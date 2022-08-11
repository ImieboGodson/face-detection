import React from 'react'

const Form = ({ onNameChange, onEmailChange, onPasswordChange, formType, onFormSubmit, onRouteChange }) => {

    const isLoginForm = formType === 'signin';
  
return (
    <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
            <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">{(isLoginForm) ? 'Sign In' : 'Sign Up'}</legend>
                <div className={`mt3 ${(isLoginForm) ? 'dn' : 'db' }`}>
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                <input onChange={onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="text" name="name"  id="name"/>
                </div>
                <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="password" name="password"  id="password"/>
                </div>
            </fieldset>
            <div className="">
                <input onClick={onFormSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value={(isLoginForm) ? 'Sign In' : 'Register'}/>
            </div>
            <div className="lh-copy mt3">
                {
                    (isLoginForm)
                    ?
                    <p>New here?<span onClick={() => onRouteChange('Register')} className="f6 link dim black db underline pointer">Register</span></p>
                    :
                    <p>Have an account already?<span onClick={() => onRouteChange('SignIn')} className="f6 link dim black db underline pointer">Sign In</span></p>
                }
            </div>
            </div>
        </main>
    </article>
  )
}

export default Form