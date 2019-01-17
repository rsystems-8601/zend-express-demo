// @flow
import React, { Component} from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
//import { userActions } from '../_actions';
import axios from 'axios';
import * as utils from '../../Userservice';

class Signin extends Component {	
	
	
	constructor(props) {
		super(props);
		//this.props.dispatch(userActions.logout());

        
        this.state = {
            user: {                
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { user } = this.state;
		this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });		
        const { user } = this.state;        
        //const { dispatch } = this.props;
		//console.log(this.state);
        // if (user.username && user.password) {
           // // dispatch(userActions.login(username, password));
		    this.signInUser(user);
        // }
    }
	
	
	
	signInUser(user){
		if(user){
		// let body = new FormData();			
				// body.append('firstName', user.firstName);
				// body.append('lastName', user.lastName);
				// body.append('username', user.username);
				// body.append('password', user.password);
				
		 axios.post(`http://localhost:4000/signInUser/api`, user)
		  .then(res => {	
			    // console.log('9999')
			    // console.log(res.data.result[0].id)
				// console.log('888')
				if(res.data.error){
					alert(res.data.result)
					localStorage.setItem('session','');
				}else{
					localStorage.setItem('session',JSON.stringify(res.data.result[0]));
					this.setState({				
						register:true,
						createID:res.data.result[0].id
					});		
					var user = JSON.parse(localStorage.getItem('session'));
					utils.profile.activeButtonName=utils.Config.Logout;
					//alert('Welcome '+ user.firstName +' '+ user.lastName )					
					this.props.history.push(`/Todaysfitness/`+user.id)
				}		
		  })
		}
	}
	
	
  render(){	  
		//const { loggingIn } = this.props;
		const { loggingIn } = true;
        const { user, submitted } = this.state;
		return (	        
			<div className="videowrapper">
				<div className="col-sm-4 col-sm-offset-2">
					<div className="clearboth"> 
					<p><img alt="logo" src="/media/logo.png" /></p>
					</div>     
					<div className="clearboth"> 					
					<form name="form" onSubmit={this.handleSubmit}>
					<div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
						<label htmlFor="username">Username</label>
						<input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
						{submitted && !user.username &&
							<div className="help-block">Username is required</div>
						}
					</div>
					<div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
						{submitted && !user.password &&
							<div className="help-block">Password is required</div>
						}
					</div>
					<div className="form-group">
						<button className="btn btn-primary">Login</button>
						{loggingIn &&
							<img alt="logo"  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
						}						
					</div>
					</form>
					</div>     
					<Link to="/Signup" className="fadeIn wow" id="button">Sign Up for Free</Link>
				</div>
			<div className="phone-shot wow fadeIn col-sm-4 col-sm-offset-2" >
				<p> <br/></p>
				<img src="/media/home-with-award2.png" width="370px" alt="Pacifica Mobile App" />				
			</div>	
			<div className="col-sm-8 col-sm-offset-2" >	
				<h1 className="fadeIn wow" >Reduce stress.<span>Feel happier.</span></h1>
				<p className="fadeIn wow" >
		Daily tools for stress, anxiety, and depression alongside a supportive community. Based on cognitive behavioral therapy &amp; mindfulness meditation.</p>	
			</div>
		</div>      
		)
	}
}


// function mapStateToProps(state) {
    // const { loggingIn } = state.authentication;
    // return {
        // loggingIn
    // };
// }

// Signin.defaultProps = {};
// Signin.propTypes = {};

// const connectedLoginPage = connect(mapStateToProps)(Signin);
//export default { connectedLoginPage as Signin }; 
export default Signin;
