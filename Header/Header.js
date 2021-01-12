import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from '../PizzeriaLogo1.png'
import './Header.css'
import Axios from "axios";
import { withRouter } from "react-router-dom";

class Header extends Component {
	constructor() {
		super();
		//localStorage.setItem("loginId", "pranava21")
		this.state = {
			loginId: localStorage.getItem('loginId'),
			counter: 0
		}
		this.signOut = this.signOut.bind(this);

		Axios.get('http://localhost:4000/getpizzasincart/' + localStorage.getItem('loginId')).then((response) => {
			if(response.data.length === 0){
				Axios.get('http://localhost:4000/gettoppingsincart/' + localStorage.getItem('loginId')).then((response) => {
					if(response.data.length === 0){
						this.setState({counter: 0});
					}
					else{
						this.setState({counter: response.data.length});
					}
				})
			}else{
				let pizzas = 0;
				for(let p of response.data) {
					pizzas += parseInt(p.qty);
				}
				Axios.get('http://localhost:4000/gettoppingsincart/' + localStorage.getItem('loginId')).then((response) => {
					if(response.data.length === 0){
						this.setState({counter: pizzas});
					}
					else{
						this.setState({counter: pizzas + response.data.length});
						//console.log(pizzas);
					}
				})
			}
		})
	}
	signOut(){
		localStorage.clear();
		this.setState({
			loginId: null
		})
		//window.location.reload();
		this.props.history.push('/homepage');
		window.location.reload();
	}
	render() {
		let loginLayout;
		let registerLayout;
		let signOutButton;
		let userNameLayout;
		if(this.state.loginId === null) {
			loginLayout = (
				<Link to='/login' className="nav-link">Login</Link>
			);

			registerLayout = (
				<Link to='/register' className="nav-link">Register</Link>
			);

			signOutButton = null;
			userNameLayout = (
				<li className="nav-item"><span className="nav-link">Welcome Guest</span></li>
			);
		}
		else{
			loginLayout = null;
			registerLayout = null;
			signOutButton = (
				<button className="btn btn-danger" onClick={this.signOut}>Sign Out</button>
			);

			userNameLayout = (
				<li className="nav-item"><span className="nav-link">Welcome {this.state.loginId}</span></li>
			);
		}
		return (
			<div>
				<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
					<Link className="navbar-brand" to='/homepage'>Pizzeria</Link>
					<img src={logo} alt="" className='header-logo'/>
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<Link className="nav-link" to='/orderpizza'>Order Pizza</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to='/buildpizza'>Build Ur Pizza</Link>
							</li>
							<li className="nav-item">
								{loginLayout}
							</li>

							<li className="nav-item">
								{registerLayout}
							</li>
						</ul>

						<ul className="navbar-nav ml-auto">
							{userNameLayout}
							<Link to='/cart'>
							<button className="btn btn-warning"><i className="fa fa-shopping-cart"/>
							Shopping Cart <span className='badge badge-light'>{this.state.counter}</span>
							</button>
							</Link>
							&nbsp; &nbsp;
							{signOutButton}
						</ul>
					</div>
				</nav><br/> <br/> <br/> <br/>
			</div>
		);
	}
}

export default withRouter(Header);
