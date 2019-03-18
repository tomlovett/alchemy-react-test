import React from 'react';
import { Redirect, Link } from '@reach/router';
import { verifyUser } from '../utilities.js';
import '@zendeskgarden/react-tables/dist/styles.css';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import {
  Table,
  Caption,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell
} from '@zendeskgarden/react-tables';

const displayPlayers = (props) => {
	return props.players.map((player) => {
		 // TODO: convert to <Player />
		return (
			<Row key={player.id}>
        <Cell width="50%">{player.first_name} {player.last_name}</Cell>
        <Cell width="25%">{player.rating}</Cell>
        <Cell width="25%">{player.handedness}</Cell>
				<button onClick={() => props.handleDeletePlayer(player.id)}>Delete</button>
			</Row>
		);
	});
}

const Roster = (props) => {
	if (!verifyUser(props)) {
		return <Redirect from="roster" to="/" />;
	}

	return (
    <div>
      <ThemeProvider>
        <Table>
          <Caption>Players</Caption>
          <Head>
            <HeaderRow>
              <HeaderCell width="50%">Name</HeaderCell>
              <HeaderCell width="25%">Rating</HeaderCell>
              <HeaderCell width="25%">Handedness</HeaderCell>
            </HeaderRow>
          </Head>
          <Body>
            {displayPlayers(props)}
            <Row key='addPlayer'>
              <Cell width="100%">
                <Link to="/player/new">Add Player</Link>
              </Cell>
            </Row>
          </Body>
        </Table>
      </ThemeProvider>
  </div>
	)
}

export default Roster;
