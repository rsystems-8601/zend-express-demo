import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import './assets/react-slider.css';
import './assets/style.css';


import Home from './components/Home';
import Bookappointment from './components/Bookappointment';
import Headerpart from './components/Headerpart';
import Footerpart from './components/Footerpart';
import Updateappointment from './components/Updateappointment';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import RegisterAppointment from './components/RegisterAppointment';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Todaysfitness from './components/Todaysfitness';
import Logout from './components/Logout';

ReactDOM.render( 

		<Router>		
		<div className="container">			
		<Headerpart/>
			<div className="app-content">
				<div className="container">
					<div>
						<Switch>						
						<Route exact path="/" component={Signin} />   
						<Route exact path="/Signin" component={Signin} />   
						<Route exact path="/Signup" component={Signup} />   
						<Route exact path="/Todaysfitness/:id" component={Todaysfitness} />   
						<Route exact path="/home" component={Home} />
						<Route exact path="/bookappointment" component={Bookappointment} />
						<Route exact path="/Updateappointment/:id" component={Updateappointment} />
						<Route exact path="/RegisterAppointment" component={RegisterAppointment} />	
						<Route exact path="/Logout" component={Logout} />							
						<Route exact path="*" component={Signin}/>
						</Switch>
					</div>					
				</div>
			</div>		
		<Footerpart/>			
		</div>		
		</Router>
  , document.getElementById('root'));
registerServiceWorker();