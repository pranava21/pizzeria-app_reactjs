import React, {Component} from 'react';
import './Home.css'

class Home extends Component {
	render() {
		return (
			<div className="container">
				<h1><b>Our Story</b></h1>
				<p>The origin of the word <i>Pizza</i> is uncertain. The food was invented in Naples about 200 years
					ago. It is the name for a special type of flatbread, made with special dough. The pizza enjoyed a
					second birth as it was taken to the United States in the late 19th century.
				</p><p>Flat breads, like the focaccia from Liguria, have been known for a very long time. Pizzas need to
				be baked at temperatures of 200&#8211;250&#160;°C. Hardly any household oven could reach such
				temperatures at the time. Because of this, the pizza was made at home, and then given to the town bakery
				to bake. In June 1889, the Neapolitan chef Raffaele Esposito created the "Margherita" in honour of Queen
				Margherita, and was the first pizza to include cheese.
			</p><p>Pizza was brought to the United States with Italian immigrants in the late nineteenth century; and
				first appeared in areas where Italian immigrants concentrated. The country's first pizzeria (place that
				focuses in pizza),Lombardi's, opened in 1905. Veterans returning from World War II Italian Campaign were
				a ready market for pizza. Since then, pizza consumption has increased in the U.S. Pizza chains such as
				Domino's, Pizza Hut, and Papa John's,
				have outlets all over the nation. Thirteen percent of the U.S. population eats pizza on any given day.
			</p>

				<div className="row">
					<div className="col-1"/>
					<img
						src="https://image.shutterstock.com/z/stock-photo-raw-dough-for-pizza-with-ingredients-and-spices-on-table-526830277.jpg"
						alt=""/>
					<div className="col-1"/>
					<div>
						<h2>Ingredients</h2> <br/>
						<p>
							We're ruthless about goodness. We have no qualms about tearing up a day-old <br/>
							lettuce leaf (straight from the farm), or streaming a baby (carrot). Cut. Cut. Chop. <br/>
							Chop. Steam. Steam. Stir. Stir. While they're still young and fresh - that's our motto.
							It <br/>
							makes the kitchen a better place.
						</p>
					</div>
				</div>
				<br/>

					<div className="row">
						<div className="col-1"/>
						<div>
							<h2>Our Chefs</h2> <br/>
							<p>
								They make sauces sing and salads dance. They create magic with skill, <br/>
								knowledge, passion, and stirring spoons (among other things). They <br/>
								make goodness so good, it doesn't know what to do with itself. We do <br/>
								though. We send it to you!
							</p>
						</div>
						<div className="col-1"/>
						<img
							src="https://thumb1.shutterstock.com/display_pic_with_logo/2982127/437116033/stock-photo-happy-chef-437116033.jpg"
							alt=""/>
					</div>
					<br/>

						<div className="row">
							<div className="col-1"/>
							<img
								src="https://thumb9.shutterstock.com/display_pic_with_logo/175989610/669255388/stock-photo-vintage-analog-kitchen-countdown-timer-with-classical-clock-face-and-red-remaining-time-display-669255388.jpg"
								alt=""/>
							<div className="col-1"/>
							<div className="center">
								<h2>45 Minute Delivery, Guaranteed!</h2> <br/>
							</div>
						</div>
			</div>
		);
	}
}

export default Home;
