// @flow
import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import Componentnameslider from '../../components/Componentnameslider';
//import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { userActions } from '../_actions';
//import axios from 'axios';

class Todaysfitness extends Component {
	static defaultProps: Object;
	
	state = {
		records: [],
		appointment_id:'',
		full_name:'',
		username:'',
		appointment_time:'',
		appointment_reason:'',
		popupUpdate:'',
		updateID:'',
		rangeVal: 1,
		textVal:'--hi',
		emoji:{
		6:'Awful.png',5:"Bad.png",2:"Good.png",3:"Normal.png",
		  4:"Laugh.png",
		  1:"Normal.png",
	7:"Sad.png"}
	};
	
	componentDidMount() {		
		if(localStorage.getItem('session')===''){
			this.props.history.push(`/Signin`);
		}else{
			const user = JSON.parse(localStorage.getItem('session'));		
			this.setState({ appointment_id : user.id ,
							full_name : user.firstName + ' '+ user.lastName,
							username : user.username ,
							appointment_time : user.booking_date,
							appointment_reason : user.reason })
		}
		
		//second way
		// if(this.props.match.params.id){
			// axios.get(`http://localhost:4000/updateappointment/api/`+(this.props.match.params.id))
			// .then(res => {				
					// const records = res.data;					
					// this.setState({ records });	
					// { this.state.records.map(record =>						
						
						// {
							// this.setState({ appointment_id : record.id }),
							// this.setState({ full_name : record.firstName + ' '+ record.lastName}),
							// this.setState({ username : record.username }),
							// this.setState({ appointment_time : record.booking_date }),
							// this.setState({ appointment_reason : record.reason })						
						// }						  						
					// )}
				// })				
		// }		
	}
	
	constructor(props) {
		super(props);
		this.updateRange1 = this.updateRange1.bind(this);
		this.milibhagat = this.milibhagat.bind(this);
		this.kanha = this.kanha.bind(this);
	  }
	  
	 updateRange1(val) {
		this.setState({
		  rangeVal: val
		})
	  }
	  
	  milibhagat(v){
		  console.log(v*2*6)
		  return v*6;
	  }
	  
	  kanha(){
		   this.setState({
			  textVal: ((this.state.textVal)+'<br>--'+(this.text2Input.value))
		   })
		 this.text2Input.value='';
		  //console.log(this.state.textVal+this.textInput.value);
	  }
 
	render() {
		const { rangeVal } = this.state;
		var oo= this.state.emoji;				
		return (
		<div>
		<h5  dangerouslySetInnerHTML={{__html: 'Welcome '+this.state.full_name}} /> 
		<p > <br /> </p>
			<div>
				<span>
					<div dangerouslySetInnerHTML={{__html: this.state.textVal}} /> 
				</span>
				<input type="text"  ref={(input) => this.textInput = input} />
				<input type="text"  ref={(input) => this.text2Input = input} />
				<button name="ok" onClick={this.kanha} >OK</button>
			</div>
		<img alt="smile" src ={'/media/emoji/'+oo[rangeVal]} />{rangeVal}
		<Componentnameslider range={rangeVal}  kamli={this.milibhagat} jitender={this.updateRange1} />
		</div>);
	}
}

Todaysfitness.defaultProps = {};
Todaysfitness.propTypes = {};

export default Todaysfitness;

