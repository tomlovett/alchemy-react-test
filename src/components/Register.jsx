import React from 'react';

const Register = (props) => {
	let formFields = {};

	return (
		<div>
			<div>
				<p>Welcome to the show! Register below:</p>
					<form onSubmit={(e) => {
							const user = {
								first_name: 			formFields.first.value,
								last_name:  			formFields.last.value,
								email:    				formFields.email.value,
								password: 				formFields.password.value,
								confirm_password: formFields.confirmPassword.value
							}
							props.handleLoginRegister(user, false);
							e.target.reset();
							e.preventDefault();
						}
					}>

						<input ref={input => formFields.first = input} placeholder='First Name' />
						<input ref={input => formFields.last = input} placeholder='Last Name' />
						<input ref={input => formFields.email = input} placeholder='Email' />
						<input type='password' ref={input => formFields.password = input} placeholder='Password' />
						<input type='password' ref={input => formFields.confirmPassword = input} placeholder='Confirm Password' />

						<button>Submit</button>
					</form>
			</div>
		</div>
	)
}

export default Register;
