import React from 'react';

const Login = (props) => {
	let formFields = {};

	return (
		<div>
			<div>
				<p>Been here before? Log in below:</p>
					<form onSubmit={(e) => {
							const user = {
								email:    formFields.email.value,
								password: formFields.password.value
							}
							props.handleLoginRegister(user, true);
							e.target.reset();
							e.preventDefault();
						}
					}>

						<input ref={input => formFields.email = input} placeholder='Email' />
						<input id="password" type='password' ref={input => formFields.password = input} placeholder='Password' />

						<button id="login">Submit</button>
					</form>
			</div>
		</div>
	)
}

export default Login;
