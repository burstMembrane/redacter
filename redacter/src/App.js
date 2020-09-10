import React, { useState, useEffect } from 'react';
import './App.css';

import { Container, Grid, Divider, Header, Image, Icon } from 'semantic-ui-react';
import redacterlogo from './redacter.svg';
import DisplayOutput from './components/DisplayOutput';
import TextInput from './components/TextInput';
import FadeIn from 'react-fade-in';

function App() {
	let [ text, handleText ] = useState(' ');

	return (
		<div className='App'>
			<Container>
				<Grid centered stackable>
					<Grid.Row>
						<FadeIn>
							<Image id='headimg' size='huge' src={redacterlogo} />
							<Header>
								{' '}
								<Icon name='privacy' /> Replace names in text with fake ones.{' '}
							</Header>
						</FadeIn>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column width={8}>
							<Header textAlign='center'> Input </Header>
							<TextInput handleText={(text) => handleText(text)} />
						</Grid.Column>
						<Divider vertical />
						<Grid.Column width={8}>
							<Header textAlign='center'> Output </Header>
							<DisplayOutput text={text} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</div>
	);
}

export default App;
