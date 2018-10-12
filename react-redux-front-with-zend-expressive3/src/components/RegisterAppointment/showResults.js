import axios from 'axios';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {	
  await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  var body = new FormData();	
		for ( var key in values ) {
			body.append(key, values[key]);
		}

		axios.post(`http://127.0.0.1:8080/createappointment`, body)
		  .then(res => {				
				if(res.data.status){
					window.location = "/home" ;
				}			
		})
});
