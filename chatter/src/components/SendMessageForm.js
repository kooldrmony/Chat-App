import React from 'react';

class SendMessageForm extends React.Component {
	constructor(){
		super()
		this.state = {
			message: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

	}

handleChange() {
	console.log(e.target.value)
	this.setState ({
		message: e.target.value
	})
}

handleSubmit() {
	e.preventDefault

}

	render(){
		console.log(this.state.message)
		return (
			<form onSubmit={this.handleSubmit} className="send-message-form">
				<input 
					value={this.state.message}
					onChange={this.handleChange}
					placeholder="Type your message and hit ENTER"
					type="text" />
			</form>
			)
	}
}

export default SendMessageForm;