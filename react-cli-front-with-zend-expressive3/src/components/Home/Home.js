// @flow
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

//import Bookappointment from './components/Bookappointment';

class Home extends Component {
	static defaultProps: Object;
	
	state = {
		records: [],
		popupNews: false,
		popupdelete: false,
		deleteID: 0,
	};
	
	popupPressRelease(){		
		this.setState({
			popupNews:!this.state.popupNews
		})	
	}
	
	showDelete(id){		
		this.setState({
			popupdelete:true,
			deleteID:id
		})	
	}
	
	confirmDelete(id){		
	let body = new FormData();
			body.append('id', id);
	axios.post(`http://127.0.0.1:8080/deleteappointment`, body)
      .then(res => {
			console.log(res);        
			this.setState({
				popupdelete:!res.data.status,
				deleteID:0
			});
			this.componentDidMount();
      })
	}  
	
	hideDelete(){		
		this.setState({
			popupdelete:false,
			deleteID:0
		})	
	}
	  
	componentDidMount() {
	axios.get(`http://127.0.0.1:8080/viewappointment`)
	.then(res => {
			const records = res.data.result;
			this.setState({ records });			
		})
	}
 
	render() {
		return (
		<div>
		<h3>
   Appointment List
</h3>	
		
		
<div className='view_appointments records' >
	<div className="row record reocrd-bold">
	<div className="col-md-2">Name</div>
	<div className="col-md-3">Reason</div>
	<div className="col-md-2">Booking Date</div>
	<div className="col-md-2">End Time</div>
	<div className="col-md-2">Action</div>
	</div>
	<div >	
	
	{ this.state.records.map(record => 
	
		<div className="row record" key={'row'+record.id}>
				  <div className="col-md-2">{record.username}</div>
				  <div className="col-md-3">{record.reason}</div>
				  <div className="col-md-2">{record.booking_date}</div>
				  <div className="col-md-2">{record.end_time}</div>
				  
				  <div  className="col-md-1 icon" alt="Edit appointment" title="Edit appointment"  >
					<Link  to={`/updateappointment/${record.id}`} className="current">Edit</Link>
				  </div>
				  
				  <div  className="col-md-1 icon" alt="Cancel appointment" title="Cancel appointment"  >
					<span  style={{cursor:'pointer'}} onClick={()=>this.showDelete(record.id)}
					>Delete</span>				  
				  </div>
		</div>
	)}
	
	</div>			  
</div> 

<button onClick={()=>this.popupPressRelease()} id="bt" >
    Press Release 
</button>



{this.state.popupNews?
<div className='press_release popup' >
<h2>Group health Press Release: </h2>
	<div>
	© 2005 - by Rsystems Ltd. All rights reserved.
		<div>
			New version launch by August'2018!
		</div>
	</div>
</div>
:null}

{this.state.popupdelete?
<div className='delete_form popup' >
<h2>Delete Appointment Details</h2>
	<div>
Are you sure to delete  Appointment No. {this.state.deleteID}?
		<div>
			<button  onClick={()=>this.confirmDelete(this.state.deleteID)} id="bt_yes">
				Yes 
			</button>
			<button  onClick={()=>this.hideDelete()} id="bt_no">
				No
			</button>
		</div>
	</div>
</div> 
:null}


</div>
		
		);
	}
}

Home.defaultProps = {};
Home.propTypes = {};

export default Home;

