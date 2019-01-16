// @flow
import React, { Component} from 'react';
//import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { userActions } from '../_actions';
import axios from 'axios';
import * as utils from '../../Userservice';

class Signup extends Component {
	static defaultProps: Object;
	
	constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        //const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
			console.log(this.state)
			this.createUser(user)
           // dispatch(userActions.register(user));
        }
    }
	
	createUser(user){
		if(user){
		let body = new FormData();
				body.append('firstName', user.firstName);
				body.append('lastName', user.lastName);
				body.append('username', user.username);
				body.append('password', user.password);
				
		axios.post(`http://localhost:4000/createUser/api`, user)
		  .then(res => {
				//console.log(res);
				if(res.status===200){					
					this.setState({
						register:true,
						createID:res.data.insertId
					});
					if(res.data.insertId<1){
						localStorage.setItem('session','');
					}else{
						this.SignInUSer(res.data.insertId);
					}
				}
		  })
		}
	}
	
	SignInUSer(id){
		if(id){			
			axios.get(`http://localhost:4000/updateappointment/api/`+(id))
			.then(res => {
					const records = res.data;					
					this.setState({ records });						
					localStorage.setItem('session',JSON.stringify(res.data[0]));
					var user = JSON.parse(localStorage.getItem('session'));
					alert('Welcome '+ user.firstName +' '+ user.lastName )
					utils.profile.activeButtonName=utils.Config.Logout;
					this.props.history.push(`/Todaysfitness/`+user.id);					
				})				
		}		
	}
 
	render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
		
		
	<div className="videowrapper">
		<div className="col-sm-4 col-sm-offset-2">
			<p> <br/></p>	
			<p><img alt="logo" src="/media/logo.png" /></p>
                
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
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
                        <button onClick={()=>this.createUser()} className="btn btn-primary">Register</button>
                        {registering && 
                            <img alt="logo" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <button type="reset" className="btn btn-link">Cancel</button>
                    </div>
                </form>
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
			
		
        );
    }
}

Signup.defaultProps = {};
Signup.propTypes = {};


// function mapStateToProps(state) {
    // const { registering } = state.registration;
    // return {
        // registering
    // };
// }

// const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
// export { connectedRegisterPage as RegisterPage };

export default Signup;

