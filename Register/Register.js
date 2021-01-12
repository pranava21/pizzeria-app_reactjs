import React, {Component} from 'react';
import Axios from "axios";
import {withRouter} from 'react-router-dom'
class Register extends Component {
	constructor() {
		super();
		this.name = React.createRef();
		this.age = React.createRef();
		this.loginId = React.createRef();
		this.email = React.createRef();
		this.password = React.createRef();
		this.type = React.createRef();
		this.submitHandler = this.submitHandler.bind(this);
	}

	submitHandler(event){
		let user = {
			name: this.name.current.value,
			age: this.age.current.value,
			loginId: this.loginId.current.value,
			email: this.email.current.value,
			password: this.password.current.value,
			userType: this.type.current.value
		}

		Axios.get('http://localhost:4000/getaccountwithloginid/' + user.loginId).then(response => {
			if(response.data.length === 0){
				Axios.post('http://localhost:4000/signup', user).then(response => {
					alert('Registered success!')
					this.props.history.push('/login');
					window.location.reload();
				})
			}
			else{
				alert('User already exists!')
			}
		})
		event.preventDefault()
	}

	render() {
		return (
			<div className='container'>
				<h1>Sign Up Here..</h1> <br />
				<form onSubmit={this.submitHandler}>
					<div className="row form-group">
						<label className="col-5">Name: </label>
						<input type="text" className="col-7 form-control" placeholder="Name" ref={this.name}/>
					</div>

					<div className="row form-group">
						<label className="col-5">Age: </label>
						<input type="number" className="col-7 form-control" placeholder="Age" ref={this.age}/>
					</div>

					<div className="row form-group">
						<label className="col-5">Login ID: </label>
						<input type="text" className="col-7 form-control" placeholder="Login ID" ref={this.loginId}/>
					</div>

					<div className="row form-group">
						<label className="col-5">Email ID: </label>
						<input type="email" className="col-7 form-control" placeholder="Email ID" ref={this.email}/>
					</div>

					<div className="row form-group">
						<label className="col-5">Password: </label>
						<input type="password" className="col-7 form-control" placeholder="Password" ref={this.password}/>
					</div>

					<div className="row form-group">
						<label className="col-5">Type: </label>
						<input type="text" className="col-7 form-control" placeholder="Prime or Regular" ref={this.type}/>
					</div>
					<br/>
					<div className="row">
						<div className="col-5"/>
						<button type="submit" className="btn btn-primary">Sign Up</button>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(Register);
