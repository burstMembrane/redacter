import React, { Component } from 'react'
import { Select, Form, TextArea, Button, Loader, Dimmer, Message } from 'semantic-ui-react'
import replaceNamesAPI from '../utils/utils'

const taggerOpts = [
  {
    key: 'stanford',
    value: 'stanford',
    text: 'Stanford NER (Slower, more accurate)'
  },
  {
    key: 'nltk',
    value: 'nltk',
    text: 'NLTK NE tagger (Faster, less accurate)'
  }
]
export default class TextInput extends Component {
  state = {
    text: '',
    names: [],
    replaced: '',
    loading: false,
    numlines: 0,
    linesindex: 0,
    method: 'nltk',
    largetext: false,
    err: ''
  }

  handleText = (e) =>
    this.setState({
      text: e.target.value
    })

  handleSubmit = async (e) => {
    let text = this.state.text
    let lines = text.split(/\r?\n/)

    this.setState({
      loading: true,
      numlines: lines.length
    })

    // if it is a short text, send in one
    if (lines.length < 20) {
      try {
        const res = await replaceNamesAPI.post('replace', {
          text: text,
          method: this.state.method
        })
        const { names, replaced } = res.data
        this.setState({
          names,
          replaced
        })
        this.props.handleText(replaced)
        this.setState({
          loading: false
        })
      } catch (error) {
        console.log(error)
        this.setState({
          err: String(error) + ". Couldn't connect to server",
          loading: false
        })
      }
    } else {
      this.setState({
        largetext: true
      })
      const res = await Promise.all(
        lines.map(async (line, i) => {
          try {
            const replaced = await replaceNamesAPI.post('replace', {
              text: line,
              method: this.state.method
            })
            this.setState({
              linesindex: i
            })
            return replaced
          } catch (error) {
            console.log(error)
            this.setState({
              err: String(error) + "\n Couldn't connect to server",
              loading: false
            })
          }
        })
      )
      if (lines.length > 50) {
        //force NLTK tagger, stanford is too slow.
        this.setState({
          method: 'nltk'
        })
      }

      let replaced = res.map((res) => {
        return res.data.replaced
      })
      const names = res.map((res) => {
        return res.data.names
      })
      replaced = replaced.join('\n')
      this.setState({
        names,
        replaced
      })
      this.props.handleText(replaced)
      this.setState({
        loading: false,
        largetext: false
      })
    }
  }

  handleSelect = (e, { value }) => {
    console.log(value)
    this.setState({
      method: value
    })
  }

  render() {
    return (
      <div>
        <Form>
          <Dimmer inverted active={this.state.loading}>
            <Loader size="large" active={this.state.loading}>
              {this.state.loading && this.state.largetext
                ? `Loading line ${this.state.linesindex} of ${this.state.numlines}`
                : `Processing ${this.state.numlines} lines`}
            </Loader>
          </Dimmer>
          <Form.Field
            required
            rows={10}
            style={{
              minHeight: '300px',
              width: '90%',
              border: '0px',
              resize: 'none'
            }}
            control={TextArea}
            value={this.state.value}
            onChange={this.handleText}
            placeholder="Paste input text here"
          />
          <Form.Group widths="equal">
            <Select
              placeholder="Select algorithm"
              options={taggerOpts}
              onChange={this.handleSelect}
            />
            <Form.Field
              basic
              control={Button}
              loading={this.state.loading}
              onClick={this.handleSubmit}>
              Replace Names
            </Form.Field>
          </Form.Group>
          <Message color="red" hidden={!this.state.err}>
            {this.state.err}
          </Message>
        </Form>
      </div>
    )
  }
}
