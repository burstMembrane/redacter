import React, { Component } from 'react';
import { Select, Form, TextArea, Button, Loader, Dimmer } from 'semantic-ui-react';
import replaceNamesAPI from '../utils/utils';

const taggerOpts = [
	{ key: 'stanford', value: 'stanford', text: 'Stanford NER (Slower, more accurate)' },
	{ key: 'nltk', value: 'nltk', text: 'NLTK POS tagger (Faster, less accurate)' }
];
export default class TextInput extends Component {
	state = {
		text: '',
		names: [],
		replaced: '',
		loading: false,
		numlines: 0,
		linesindex: 0,
		method: 'nltk'
	};

	handleText = (e) => {
		let text = e.target.value;
		this.setState({
			text
		});
		// this.props.handleText(text);
	};

	handleSubmit = async (e) => {
		this.setState({
			loading: true
		});
		let text = this.state.text;
		let lines = text.split(/\r?\n/);

		this.setState({
			numlines: lines.length
		});

		// if it is a short text, send in one
		if (lines.length < 5) {
			const res = await replaceNamesAPI.post('replace', {
				text: text,
				method: this.state.method
			});
			const { names, replaced } = res.data;
			this.setState({
				names,
				replaced
			});
			this.props.handleText(replaced);
			this.setState({
				loading: false
			});
		} else {
			const res = await Promise.all(
				lines.map(async (line, i) => {
					const replaced = await replaceNamesAPI.post('replace', {
						text: line,
						method: this.state.method
					});
					this.setState({
						linesindex: i
					});
					return replaced;
				})
			);

			let replaced = res.map((res) => {
				return res.data.replaced;
			});
			const names = res.map((res) => {
				return res.data.names;
			});
			// let res = []
			// res = await Promise.all(
			// ))

			replaced = replaced.join('\n');
			this.setState({
				names,
				replaced
			});
			this.props.handleText(replaced);
			this.setState({
				loading: false
			});
		}
	};

	handleSelect = (e, { value }) => {
		console.log(value);
		this.setState({ method: value });
	};

	render() {
		return (
			<div>
				<Form>
					<Dimmer active={this.state.loading}>
						<Loader active={this.state.loading}>
							{' '}
							{this.state.loading ? (
								`Loading line ${this.state.linesindex} of ${this.state.numlines}`
							) : null}
						</Loader>
					</Dimmer>
					<Form.Field
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
						placeholder='Paste input text here'
					/>
					<Select placeholder='Select algorithm' options={taggerOpts} onChange={this.handleSelect} />
					<Form.Field basic control={Button} loading={this.state.loading} onClick={this.handleSubmit}>
						{' '}
						Replace Names {' '}
					</Form.Field>{' '}
				</Form>{' '}
			</div>
		);
	}
}
