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
              <div className="scrollContainer">
                <Header className="scroll">
                  {' '}
                  Turn real names into fakes. Redact them completely. Anonymize your text.{' '}
                </Header>
              </div>
            </FadeIn>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header textAlign="center"> Input </Header>
              <Divider />
              <TextInput handleText={(text) => handleText(text)} />
            </Grid.Column>
            <Divider vertical section />
            <Grid.Column width={8}>
              <Header textAlign="center"> Output </Header>
              <Divider />
              <DisplayOutput text={text} />
            </Grid.Column>
          </Grid.Row>
          <FadeIn>
            <Divider hidden section />
            <Grid.Row>
              <p>
                Built in <Icon name="react" /> with a <Icon name="python" /> backend by &nbsp;
                <a href="http://liampower.dev" target="_blank" rel="noopener noreferrer">
                  Liam Power. &nbsp;
                </a>
                Uses the &nbsp;
                <a href="https://nlp.stanford.edu/software/CRF-NER.shtml">Stanford NER &nbsp;</a>
                and NLTK named entity taggers. View code on &nbsp;
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
