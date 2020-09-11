import React, { useState } from 'react'
import './App.css'

import { Container, Grid, Divider, Header, Image, Icon } from 'semantic-ui-react'
import redacterlogo from './redacter.svg'
import DisplayOutput from './components/DisplayOutput'
import TextInput from './components/TextInput'
import FadeIn from 'react-fade-in'

function App() {
  let [text, handleText] = useState(' ')

  return (
    <div className="App">
      <Container>
        <Grid centered stackable>
          <Grid.Row centered>
            <FadeIn>
              <Image id="headimg" size="huge" src={redacterlogo} />
              <Header> Anonymize your text. </Header> <Divider />
            </FadeIn>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header textAlign="center"> Input </Header>
              <TextInput handleText={(text) => handleText(text)} />
            </Grid.Column>
            <Divider vertical />
            <Grid.Column width={8}>
              <Header textAlign="center"> Output </Header>
              <DisplayOutput text={text} />
            </Grid.Column>
          </Grid.Row>
          <FadeIn>
            <Divider hidden section />
            <Grid.Row>
              <p>
                Built in <Icon name="react" /> with a <Icon name="python" /> backend by
                <a href="http://liampower.dev" target="_blank" rel="noopener noreferrer">
                  Liam Power.
                </a>
                Uses the
                <a href="https://nlp.stanford.edu/software/CRF-NER.shtml">Stanford NER</a>
                and NLTK named entity taggers. View code at
                <a
                  href="https://github.com/burstMembrane/redacter"
                  target="_blank"
                  rel="noopener noreferrer">
                  <Icon name="github" />
                </a>
              </p>
            </Grid.Row>
          </FadeIn>
        </Grid>
      </Container>
    </div>
  )
}

export default App
