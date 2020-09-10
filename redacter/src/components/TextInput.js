import React, { Component } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import replaceNamesAPI from '../utils/utils';

export default class TextInput extends Component {
	state = { text: '', names: [], replaced: '', loading: false };

	handleText = (e) => {
		let text = e.target.value;
		this.setState({ text });
		// this.props.handleText(text);
	};

	handleSubmit = async (e) => {
		this.setState({ loading: true });
		let text = this.state.text;
		const res = await replaceNamesAPI.post('replace', {
			text: text
		});

		const { names, replaced } = res.data;
		this.setState({ names, replaced });
		this.props.handleText(replaced);
		this.setState({ loading: false });
	};

	render() {
		return (
			<div>
				<Form loading={this.state.loading}>
					<Form.Field
						rows={10}
						style={{ minHeight: '300px', width: '90%', border: '0px', resize: 'none' }}
						control={TextArea}
						value={this.state.value}
						onChange={this.handleText}
						placeholder='Paste input text here'
					/>

					<Form.Field basic control={Button} loading={this.state.loading} onClick={this.handleSubmit}>
						{' '}
						Replace Names{' '}
					</Form.Field>
				</Form>
			</div>
		);
	}
}
