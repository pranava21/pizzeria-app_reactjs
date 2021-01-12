import React, {Component} from 'react';
import Axios from "axios";
import './BuildPizza.css'

class BuildPizza extends Component {

	constructor() {
		super();
		this.state = {
			allToppings: [],
			selectedToppings: [],
			totalPrice: 0
		}
		this.handleChange = this.handleChange.bind(this);
		this.buildPizza = this.buildPizza.bind(this);
		Axios.get('http://localhost:4000/getalltoppings').then((response) => {
			this.setState({allToppings: response.data})
		})
	}

	handleChange(event){
		console.log(event.target.value);
		Axios.get('http://localhost:4000/gettoppingbyid/' + event.target.value).then((response) => {
			let list = this.state.selectedToppings
			if(event.target.checked) {
				list.push(response.data[0])
				this.setState({
					totalPrice: this.state.totalPrice + response.data[0].price,
					selectedToppings: list
				});
			}else{
				//console.log(list.filter((t) => t.name !== response.data[0].name));
				console.log(response.data[0].tname);
				this.setState({
					totalPrice: this.state.totalPrice - response.data[0].price,
					selectedToppings: list.filter((t) => t.tname !== response.data[0].tname)
				});
			}
		})
	}

	buildPizza(){
		let toppingList = [];

		for(let t of this.state.selectedToppings){
			toppingList.push({
				foodType: 'topping',
				loginId: localStorage.getItem('loginId'),
				details: t
			})
		}
		Axios.post('http://localhost:4000/addtoppingstocart', toppingList).then((response) => {
			alert('Added toppings to cart');
			window.location.reload();
		})
	}

	render() {
		return (
			<div className="container">
				<h1>Build Pizza</h1>
				<div className="row">
					<div className="col-3"/>
					<table border="3" className="table table-striped table-bordered table-hover col-6">
						<tbody>
						{this.state.allToppings.map((topping, index) => <tr key={index}>
							<td><img src={topping.image} alt="" className="toppingImage"/></td>
							<td>{topping.tname} -  &#x20B9; {topping.price}</td>
							<td className="addTopping"><input value={topping.id} type="checkbox" onChange={this.handleChange} /> &nbsp; Add</td>
						</tr>)}
						</tbody>
					</table>
				</div>
				<h2>Total Price: &#x20B9; {this.state.totalPrice}</h2>
				<div className="row">
					<div className="col-5"/>
					<button className="btn btn-warning bg-dark"
					        onClick={this.buildPizza} style={{color: 'gold'}}>
						Build Pizza
					</button>
				</div>
			</div>
		);
	}
}

export default BuildPizza;
