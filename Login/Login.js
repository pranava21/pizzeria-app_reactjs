import React, {Component} from 'react';
import Axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	handleEmailChange(event) {
		this.setState({ email: event.target.value });
	}

	handlePasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	handleSubmit(event) {
		Axios.get('http://localhost:4000/getaccountwithloginid/' + this.state.email).then((response) => {
			if(response.data.length === 0){
				alert('Invalid/Email Does Not Exist!');
			}
			else{
				let password = response.data[0].password;
				if(this.state.password === password){
					alert("Successfully Logged In!");
					localStorage.setItem("loginId", this.state.email)
					this.props.history.push('/orderpizza');
					window.location.reload();
				}
				else{
					alert("Invalid password, please try again");
				}
			}
		})
		event.preventDefault();
		window.location.reload();
	}
	render() {
		return (
			<div className="container">
				<h2>Login to your Account</h2> <br /> <br />
				<form onSubmit={this.handleSubmit}>

						<div className="row form-group">
							<label className="col-5">Email: </label>
							<input type="text" value={this.state.email} placeholder='Enter Login ID'
							       onChange={this.handleEmailChange} className="col-7 form-control"/>
						</div> <br />


					<div className="row form-group">
						<label className="col-5">Password: </label>
						<input className='col-7 form-control' type="password" placeholder='Enter Password'
						       value={this.state.password} onChange={this.handlePasswordChange}/> <br />
					</div> <br /> <br />

					<div className="row">
						<div className="col-5" />
						<button type="submit" className="btn btn-success">Login</button>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(Login);
