import React from 'react';
import { Link } from '@reach/router';

const Index = () => {
	return (
		<div>
			<Link to="/register">Register</Link> <Link to="/login">Login</Link>
		</div>
	)
}

export default Index;
