import React, {Component} from 'react';
import Axios from "axios";
import './OrderPizza.css'
import veg from './veg.png'
import nonveg from './nonveg.png'
class OrderPizza extends Component {
	constructor() {
		super();
		this.state = {
			pizzaList: [],
			qty: "1"
		}
		this.handleQuantity = this.handleQuantity.bind(this)
		this.addToCart = this.addToCart.bind(this);
		Axios.get('http://localhost:4000/getallpizzas').then((response) => {
			this.setState({
				pizzaList: response.data,
			})
		})
	}

	info(i){
		return i + ", "
	}

	vegOrNonveg(type){
		if(type === "veg"){
			return <img src={veg} alt="" className="type"/>
		}
		else{
			return <img src={nonveg} alt="" className="type"/>
		}
	}

	handleQuantity(event){
		this.setState({qty: event.target.value})
		//console.log(event.target.value);
	}

	addToCart(event){
		//console.log(this.state.qty);
		//this.setState({qty: "1"})
		if(localStorage.getItem("loginId") !== null){
			//console.log(event.target.value);
			Axios.get('http://localhost:4000/getpizzabyid/' + event.target.value).then((response) => {
				let selectedPizza = {
					foodType: "pizza",
					loginId: localStorage.getItem('loginId'),
					qty: this.state.qty,
					details: response.data[0]
				};
				Axios.post('http://localhost:4000/addpizzatocart', selectedPizza).then((response) => {
					alert("Added To Cart");
					this.setState({qty: "1"})
					window.location.reload();
				})
			})
		}
	}

	render() {
		return (
			<div className="container">
				<h1>Order Pizza</h1>
				<div className="card-group">
					<div className="row">
						{this.state.pizzaList.map((pizza, index) => {
							return (
								<div className="col-6" key={index}>
									<div className="card bg-light h-100">
										<div className="row">
											<div className="col-3" key={index}>
												<h6 className='card-title' key={index}>
													{pizza.name}
												</h6>
												<p><strong>&#x20B9; {pizza.price}</strong></p>
												{this.vegOrNonveg(pizza.type)}
											</div>
											<div className="col-5 info">
												<p className="card-text">
												Description: {pizza.description} <br /> <br/>
												Ingredients: {pizza.ingredients.map(this.info)} <br /> <br />
												Toppings: {pizza.topping.map(this.info)}
												</p>
											</div>
											<div className="col-4">
												<img src={pizza.image} className="pizzaImage" alt=""/> <br/> <br />
												<button value={pizza.id} className="btn btn-warning" style={{fontSize:13}} onClick={this.addToCart}>
													Add to Cart
												</button>
												<br /> <br />
												<select onChange={this.handleQuantity}>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</select>
											</div>
										</div> <br />
									</div>
								</div>
							)}
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default OrderPizza;
