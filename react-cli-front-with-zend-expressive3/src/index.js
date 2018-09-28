import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import Bookappointment from './components/Bookappointment';
import Headerpart from './components/Headerpart';
import Footerpart from './components/Footerpart';
import Updateappointment from './components/Updateappointment';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render( 

		<div className="container">
		  <Headerpart/>
				
			<div className="app-content">
				<div className="container">
					<Router>
						  <div>
							<Route exact path="/" component={App} />       
							<Route exact path="/bookappointment" component={Bookappointment} />                		
							<Route exact path="/Updateappointment/:id" component={Updateappointment} />                		
						  </div>
					</Router>
				</div>
			</div>
		
			<Footerpart/>
		</div>
		

  
  , document.getElementById('root'));
registerServiceWorker();