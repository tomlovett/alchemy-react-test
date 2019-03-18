import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';
import { verifyUser } from '../../utilities';

const PlayerNew = (props) => {
  const formFields = {};

	if (!verifyUser(props)) {
		return <Redirect from="player/new" to="/" />;
	}

	return (
		<div>
			<p>Tell us about this so-called player:</p>
			<form onSubmit={(e) => {
					const player = {
						first_name: formFields.first.value,
						last_name: formFields.last.value,
						rating:	formFields.rating.value,
						handedness: formFields.handedness.value,
					};
					props.handleAddPlayer(player);
					e.target.reset();
					e.preventDefault();
				}
			}>

  			<input ref={input => formFields.first = input} placeholder='First Name' />

  			<input ref={input => formFields.last = input} placeholder='Last Name' />

  			<label>Rating:
  					<select ref={select => formFields.rating = select}>
  						<option value="1">1</option>
  						<option value="2">2</option>
  						<option value="3">3</option>
  						<option value="4">4</option>
  						<option value="5">5</option>
  					</select>
  				</label>

				<label>Handedness:
					<select ref={select => formFields.handedness = select}>
						<option value="right">Righty</option>
						<option value="left">Lefty</option>
					</select>
				</label>

				<button>Submit</button>
			</form>
		</div>
	);
};

export default PlayerNew;
