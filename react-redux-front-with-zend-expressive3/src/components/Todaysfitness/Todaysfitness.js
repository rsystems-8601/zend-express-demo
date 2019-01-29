// @flow
import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import Componentnameslider from '../../components/Componentnameslider';
//import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { userActions } from '../_actions';
//import axios from 'axios';
import axios from 'axios';
//import * as utils from '../../Userservice';

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
		textVal:'',
		emoji:{
			1:"Normal",2:"Good",3:"Normal",
		  4:"Laugh",5:"Bad",6:'Awful',7:"Sad"
		  
		},
		emojiColor:{
		  1:"#60D293",2:"#5FE9C4",3:"#5BDDDF",
		  4:"#58CAF6",5:"#FFBE66",6:'#FF9B73',7:"#FF6669"
		}
	};
	
	componentDidMount() {		
		if(localStorage.getItem('session')===''){
			this.props.history.push(`/Signin`);
		}else{
			const user = JSON.parse(localStorage.getItem('session'));
			if(user){	
			this.setState({ appointment_id : user.id ,
							full_name : user.firstName + ' '+ user.lastName,
							username : user.username ,
							appointment_time : user.booking_date,
							rangeVal : user.mood_emoji,
							textVal : user.mood_entry==null?'':user.mood_entry,
							appointment_reason : user.reason })
			}
		}
	}
	
	constructor(props) {
		super(props);		
		//console.log(this.props.contacts.name)
		this.updateRange1 = this.updateRange1.bind(this);
		this.milibhagat = this.milibhagat.bind(this);
		this.kanha = this.kanha.bind(this);
	  }
	  
	 updateRange1(val) {
		 //alert(val)
		 if(val>0){
			this.setState({
			  rangeVal: val
			})
		 }
	  }
	  
	  milibhagat(v){
		  //console.log(v*2*6)		  
		  return v*6;
	  }
	  
	  kanha(){
		  if(this.text2Input.value!==''){
		   this.setState({
			  textVal: '--'+(this.text2Input.value)+'<br>'+(this.state.textVal)
		   })
		 this.text2Input.value='';
		  //console.log(this.state.textVal+this.textInput.value);
		  }
	  }
	  
	handleSubmit(event) {
        var user = {
			mood_entry:this.state.textVal,
			mood_emoji:this.state.rangeVal,			
			mood_user_id:this.state.appointment_id		
			}      		
        if (user.mood_emoji && user.mood_user_id) {	
			this.createMood(user);           
        }else{
			alert('Please add mood entry');
		}		
    }
	
	createMood(user){
		if(user){
		axios.post(`http://localhost:4000/createMood/api`, user)
		  .then(res => {
				//console.log(res);
				
				if(res.status===200){					
					// this.setState({
						// register:true,
						// createID:res.data.insertId
					// });
					// if(res.data.insertId<1){
						// localStorage.setItem('session','');
					// }else{
						// this.SignInUSer(res.data.insertId);
					// }
				}
		  })
		}
	}
	
 
	render() {
		const { rangeVal } = this.state;
		var oo= this.state.emoji;				
		var oocolor= this.state.emojiColor;				
		return (
		<div className="fitbit">
		<div className="fitbit1">
		<div className="clearboth">
			<h5 className="fitbit-Welcome"  dangerouslySetInnerHTML={{__html: 'Welcome <strong>'+this.state.full_name+'<strong>'}} /> 
			</div>
			
			<center><img alt="smile" src ={'/media/emoji/'+oo[rangeVal]+'.png'} /></center>
			<div className="clearboth"><div> 
				<span  style={{'float':'left'}}> HOW ARE YOU?</span> 
				<span style={{'float':'right'}}>{oo[rangeVal]} </span> 
			</div></div>
			
			<div className="clearboth"> 
			<Componentnameslider range={rangeVal} emojiname={oo[rangeVal]} colorcode={oocolor[rangeVal]} kamli={this.milibhagat} jitender={this.updateRange1} />
			</div>
			
		</div>
		<div className="fitbit2">
			<div>
				<div className="clearboth"> 							
				<textarea type="text" className="form-control" ref={(input) => this.text2Input = input} /> 
				</div>
				<div className="clearboth"> 
					<button name="ok" onClick={this.kanha} className="btn">New Mood Entry</button>
				</div>
				<div className="clearboth"> 
					<button name="ok" onClick={()=>this.handleSubmit()} className="btnDone">Done</button>
				</div>
				<div className="clearboth"> 
				<h5 className="fitbit-head"  dangerouslySetInnerHTML={{__html: 'Your past mood:'}} /> 
				<span>
					<div dangerouslySetInnerHTML={{__html: this.state.textVal}} /> 
				</span>
				</div>
				
			</div>
		</div>
		</div>);
	}
}

Todaysfitness.defaultProps = {};
Todaysfitness.propTypes = {};

export default Todaysfitness;

