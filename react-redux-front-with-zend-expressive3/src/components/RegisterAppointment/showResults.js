import axios from 'axios';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {	
  await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);  
  var body = new FormData();	
		for ( var key in values ) {
			if(key=='appointment_time'){
				body.append(key, values[key].replace('T',''));
			}else{
				body.append(key, values[key]);
			}
		}

		
		axios.post(`http://localhost:4000/createappointment/api`, values)
		  .then(res => {				
				if(res.data.status){
					window.location = "/home" ;
				}			
		})
});
