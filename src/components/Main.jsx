import React from 'react';
import { Router, Link, navigate } from '@reach/router';
import { verifyUser } from '../utilities.js';
import Index from './Index.jsx';
import Login from './Login.jsx';
import Roster from './Roster.jsx';
import Register from './Register.jsx';
import PlayerNew from './Player/New.jsx';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			players: [],
			token: null,
			user: null
		}

		this.baseUrl = 'https://players-api.developer.alchemy.codes/api';
		this.handleAddPlayer = this.handleAddPlayer.bind(this);
		this.handleDeletePlayer = this.handleDeletePlayer.bind(this);
		this.handleLoginRegister = this.handleLoginRegister.bind(this);
		this.handleLoginRegister = this.handleLoginRegister.bind(this);
		this.logout = this.logout.bind(this);
		this.logUserIn = this.logUserIn.bind(this);
		this.loadRoster();
	}

	logout() {
		this.setState({
			user: null,
			token: null
		});
	}

	logUserIn(data) {
		if (!data.success) {
			alert('Failed to authenticate');
			// TODO: Split for register/login
			return;
		}

		const { user, token } = data;
		this.setState({ user, token });
    this.loadRoster();
		navigate('/roster');
	}

	handleLoginRegister(user, isLogin) {
    const url = isLogin ? `${this.baseUrl}/login` : `${this.baseUrl}/user`;

		fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		}).then((res) => {
			return res.json();
		}).then((data) => {
			this.logUserIn(data);
		});
	}

	handleAddPlayer(player) {
		fetch(`${this.baseUrl}/players`, {
			method: 'POST',
			headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
			body: JSON.stringify(player)
		}).then((res) => {
			return res.json();
		}).then((data) => {
			if (!data || !data.success) {
				alert('Something went wrong...');
				return;
			}

			this.state.players.push(data.player);
			navigate('/roster')
		});
	}

	handleDeletePlayer(playerId) {
		fetch(`${this.baseUrl}/players/${playerId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${this.state.token}`
			}
		}).then((res) => {
			if (res.ok) {
				const players = this.state.players.filter((player) => player.id !== playerId)
				this.setState({ players });
			}
		});
	}

	loadRoster() {
		if (!verifyUser(this.state)) {
			return;
		}

		fetch(`${this.baseUrl}/players`, {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
		}).then((res) => {
			return res.json();
		}).then((data) => {
			if (!data || !data.success) {
				alert('Something went wrong...');
				return;
			}

			this.setState({ players: data.players });
		})
	}

	render() {
		return (
			<div>
				<div>
					<h1>Super Fun Sports Time!</h1>
				</div>
				<nav>
          {
           verifyUser(this.state) ? <button onClick={() => this.logout()}>Log out</button> : null
          }
				</nav>

				<div>
					<Router>
						<Index path="/" />
						<Login path="/login" handleLoginRegister={this.handleLoginRegister} />
						<Register path="/register" handleLoginRegister={this.handleLoginRegister} />
						<Roster path="/roster"
							players={this.state.players}
							user={this.state.user}
							token={this.state.token}
							handleDeletePlayer={this.handleDeletePlayer}
						/>
						<PlayerNew path="/player/new"
							handleAddPlayer={this.handleAddPlayer}
							user={this.state.user}
							token={this.state.token}
						/>
					</Router>
				</div>
			</div>
		);
	}
}

export default Main;
