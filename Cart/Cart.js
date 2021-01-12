import React, {Component} from 'react';
import Axios from "axios";

class Cart extends Component {
	constructor() {
		super();
		this.state = {
			pizzas: [],
			toppings: [],
			price: 0,
			discount: 0
		};
		this.changeQty = this.changeQty.bind(this);
		this.qty = React.createRef;
		this.deletePizza = this.deletePizza.bind(this);
		this.deleteTopping = this.deleteTopping.bind(this);
		this.order = this.order.bind(this);
		this.clear = this.clear.bind(this);
		Axios.get('http://localhost:4000/getpizzasincart/' + localStorage.getItem('loginId')).then(response => {
			this.setState({pizzas: response.data});
			Axios.get('http://localhost:4000/gettoppingsincart/' + localStorage.getItem('loginId')).then(response => {
				this.setState({toppings: response.data});
				for(let p of this.state.pizzas) {
					this.setState({
						price: this.state.price + parseInt(p.details.price) * parseInt(p.qty)
					})
				}

				for(let t of this.state.toppings){
					this.setState({
						price: this.state.price + parseInt(t.details.price)
					})
				}

				let loginId = localStorage.getItem('loginId');
				if(loginId !== null){
					Axios.get('http://localhost:4000/getaccountwithloginid/' + loginId).then((response) => {
						if(response.data[0].userType === "prime"){
							this.setState({
								discount: this.state.price * 10/100,
								price: this.state.price - this.state.discount
							})
							console.log(this.state.price - this.state.discount);
							this.setState({price: this.state.price - this.state.discount})
						}
					})
				}
			})
		})
	}

	changeQty(event, pizza){
		if(event.target.value !== ""){
			if(event.target.value <= 5 && event.target.value > 0) {
				let pizzaObj = {
					id: pizza._id,
					qty: event.target.value
				}
				Axios.put('http://localhost:4000/updatepizzaqty', pizzaObj).then((response) => {
					window.location.reload();
				})
			}else if(event.target.value === 0){
				alert("Min Order Qty is 1");
				window.location.reload();
			}
			else if(event.target.value > 5){
				alert("Max Order Qty is 5");
				window.location.reload();
			}
		}
	}

	deletePizza(event, pizza){
		//console.log(event.target.value);
		if(window.confirm("Are you sure you want to remove?")) {
			Axios.delete('http://localhost:4000/deletefromcart/' + event.target.value).then(() => {
				window.location.reload();
			})
		}
	}

	deleteTopping(event){
		if(window.confirm("Are you sure you want to remove?")) {
			Axios.delete('http://localhost:4000/deletefromcart/' + event.target.value).then(() => {
				window.location.reload();
			})
		}
	}

	order(){
		alert('Order Placed!')
	}

	clear(){
		Axios.delete('http://localhost:4000/clearcart/' + localStorage.getItem('loginId')).then(()=>{
			alert('Cart Cleared!');
			window.location.reload();
		})
	}

	render() {
		return (
			<div className='container'>
				<h2>Welcome to your Cart</h2>
				<div className="row">
					<div className="col-3"/>
					<table className="table table-striped table-hover col-6">
						<thead>
							<tr>
								<th>Name</th>
								<th>Price</th>
								<th colSpan="3">Qty</th>
							</tr>
						</thead>
						<tbody>
							{this.state.pizzas.map((pizza, index) => <tr key={index}>
									<td>{pizza.details.name}  Pizza</td>
									<td>{pizza.details.price}</td>
									<td>{pizza.qty}</td>
									<td><input type="number" onBlur={(event) => this.changeQty(event, pizza)} ref={this.qty}/></td>
									<td><button value={pizza._id} className="btn btn-danger" onClick={this.deletePizza}>Delete</button></td>
								</tr>
							)}

							{this.state.toppings.map((topping, index) => <tr key={index}>
									<td>{topping.details.tname}</td>
									<td>{topping.details.price}</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td><button value={topping._id} className="btn btn-danger" onClick={this.deleteTopping}>Delete</button></td>
								</tr>
							)}
							<tr>
								<td><b>Total</b></td>
								<td colSpan="4"><b>{this.state.price}</b></td>
							</tr>
						</tbody>
					</table>
					<div className="col-3"/>
				</div>

				<div className="row">
					<div className="col-4"/>
					<button className="btn btn-success" onClick={this.order}>Order Now!</button>
					<div className="col-1"/>
					<button type="submit" className="btn btn-danger" onClick={this.clear}>Clear Cart</button>
					<div className="col-4"/>
				</div>
					<br />
				<div className="row">
					<div className="col-4"/>
					<div className="alert alert-info col-4" style={{textAlign: "center"}}>
						Total savings on this order &#x20B9; {this.state.discount}
					</div>
					<div className="col-4"/>
				</div>
			</div>
		);
	}
}

export default Cart;
