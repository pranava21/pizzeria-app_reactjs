import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Redirect, BrowserRouter as Router, Route} from "react-router-dom";
import OrderPizza from "./OrderPizza";
import BuildPizza from "./BuildPizza";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import Register from "./Register";


ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Route path='/' component={App} />
        <Route exact path='/'>
            <Redirect to='/homepage'/>
        </Route>
        <Route path='/homepage' component={Home}/>
        <Route path='/orderpizza' component={OrderPizza} />
        <Route path='/buildpizza' component={BuildPizza} />
        <Route path='/login' component={Login} />
        <Route path='/cart' component={Cart} />
        <Route path='/register' component={Register} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
