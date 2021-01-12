const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const url = 'mongodb://localhost:27017';
const database = 'pizzeriaDB'
const ObjectId = require('mongodb').ObjectID;

const pizzeriaServer = express();
pizzeriaServer.use(bodyParser.json());
pizzeriaServer.use(cors());

pizzeriaServer.get('/getallpizzas', (req, res) => {
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('pizzas').find().toArray((err, result) => {
				if(err) console.log(err);
				else{
					res.send(result);
				}
				client.close();
			})
		}
	})
})

pizzeriaServer.get('/getpizzabyid/:id', (req, res) => {
	let id = req.params.id;
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('pizzas').find({id: id}).toArray((err, result) => {
				if(err) console.log(err);
				else{
					res.send(result);
				}
				client.close();
			})
		}
	})
})

pizzeriaServer.post('/addpizzatocart', (req, res) => {
	let pizzaObj = req.body;
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('cart').insertOne(pizzaObj);
			res.send({result: true});
		}
		client.close();
	})

})

pizzeriaServer.get('/getpizzasincart/:user', (req, res) => {
	let user = req.params.user;
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('cart').find({foodType: {$eq: "pizza"}, loginId: user}).toArray((err, result) => {
				if(err) console.log(err);
				else{
					//console.log(localStorage.getItem("loginId"));
					res.send(result);
				}
				client.close();
			})
		}
	})
})

pizzeriaServer.get('/getalltoppings', (req, res) => {
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('toppings').find().toArray((err, result) => {
				if(err) console.log(err);
				else{
					res.send(result);
				}
				client.close();
			})
		}
	})
})

pizzeriaServer.get('/gettoppingbyid/:id', (req, res) => {
	let id = parseInt(req.params.id);
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('toppings').find({id: id}).toArray((err, result) => {
				if(err) console.log(err);
				else{
					res.send(result);
				}
				client.close();
			})
		}
	})
})

pizzeriaServer.post('/addtoppingstocart', (req, res) => {
	let toppings = req.body;
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('cart').insertMany(toppings);
			res.send({result: true});
		}
		client.close();
	})

})

pizzeriaServer.get('/gettoppingsincart/:user', (req, res) => {
	let user = req.params.user;
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('cart').find({foodType: {$eq: "topping"}, loginId: user}).toArray((err, result) => {
				if(err) console.log(err);
				else{
					res.send(result);
				}
				client.close();
			})
		}
	})
})

pizzeriaServer.get('/getpizzabyname', (req, res) => {
	let pizzaName = req.params.name;
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('cart').find({foodType: {$eq: "pizza"}, details:{name: pizzaName}}).toArray((err, result) => {
				if(err) console.log(err);
				else{
					res.send(result);
				}
				client.close();
			})
		}
	})
})

pizzeriaServer.put('/updatepizzaqty', (req, res) => {
	let id = new ObjectId(req.body.id);
	let qty = req.body.qty;
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('cart').update({_id: id}, {$set: {qty: qty}})
			res.send({result: true});
			client.close();
		}
	})
})



pizzeriaServer.get('/gettoppingbyname', (req, res) => {
	let toppingName = req.params.name;
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('cart').find({foodType: {$eq: "topping"}, details:{tname: toppingName}}).toArray((err, result) => {
				if(err) console.log(err);
				else{
					res.send(result);
				}
				client.close();
			})
		}
	})
})

pizzeriaServer.delete('/clearcart/:user', (req, res) => {
	let user = req.params.user;
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('cart').deleteMany({foodType: {$eq: "pizza"}, loginId: user});
			db.collection('cart').deleteMany({foodType: {$eq: "topping"}, loginId: user});
			res.send({result: true});
			client.close();
		}
	})
})

pizzeriaServer.delete('/deletefromcart/:id', (req, res) => {
	let id = new ObjectId(req.params.id);
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('cart').remove({ _id: id});
			//db.collection('cart').deleteMany({foodType: {$eq: "topping"}, loginId: user});
			res.send({result: true});
			client.close();
		}
	})
})


pizzeriaServer.post('/signup', (req, res) => {
	let name = req.body.userName;
	let age = req.body.userAge;
	let loginId = req.body.loginId;
	let email = req.body.email;
	let password = req.body.password;
	let userType = req.body.userType;

	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('accounts').insert({
				name: name,
				age: age,
				loginId: loginId,
				email: email,
				password: password,
				userType: userType
			});
			res.send({status: true, result: "Registered Successfully!"});
		}
		client.close();
	})
})

pizzeriaServer.get('/getaccountwithloginid/:loginId', (req, res) => {
	let loginId = req.params.loginId;
	mongodb.connect(url, (err, client) => {
		if(err) console.log(err);
		else{
			const db = client.db(database);
			db.collection('accounts').find({loginId: {$eq: loginId}}).toArray((err, account) => {
				if(err) console.log(err);
				else{
					res.send(account);
				}
			})
			client.close();
		}
	})
})

pizzeriaServer.listen(4000, ()=> console.log('Server Started'));
