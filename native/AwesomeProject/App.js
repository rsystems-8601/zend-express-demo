import React, {Component} from 'react';
import { StyleSheet, Text, Button ,View, Image,ImageBackground, AppRegistry,
 Alert,  Platform,   TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback   } from 'react-native';
import Greeting from './components/Greeting';

export default class App extends Component {
	
	state = {
		textValue: 'Change me',
		Loading: ''
	}
	//pradeep786expo::Welcome@8601
	update1(e) {
     this.setState({
		  Loading: 'Checked-In is loading .....'
		})
    }
	
	update2(e) {
     this.setState({
		  Loading: 'Guide is loading .....'
		})
    }
	update3(e) {
     this.setState({
		  Loading: 'Activities is loading .....'
		})
    }
	update4(e) {
     this.setState({
		  Loading: 'Community  is loading .....'
		})
    }
	
	update5(e) {
     this.setState({
		  Loading: 'Thearpy is loading .....'
		})
    }	  
	
	constructor() {
		super();
		this.setState({ val: 0 });
		this.update1 = this.update1.bind(this)
		this.update2 = this.update2.bind(this)
		this.update3 = this.update3.bind(this)
		this.update4 = this.update4.bind(this)
		this.update5 = this.update5.bind(this)
    }
	
  render() {
	let pic = {
      uri: './assets/Bananavarieties.jpg'
	};     
	const resizeMode = 'center';	
    return (
	<ImageBackground
        style={{          
			flex: 1,
			width: '100%',
			height: '100%',
			resizeMode: 'cover'          
        }}
        source={require('./assets/mountain.jpg')}
      >
      <View style={styles.container}>
		<View style={styles.container2}>
			<Text style={{ fontWeight:'bold', color: '#FFFFFF',justifyContent:'center',marginLeft: 35,marginTop: 35,}}>
			Welcome in Rsysfitbit mood and fitness tracker!</Text>	
			<View style={{ alignItems: 'center',
		justifyContent: 'center',}}>			
				<Image source={require('./assets/logo.png')} style={{ alignItems: 'center',marginLeft: 35,marginTop: 35,marginBottom: 40,
		justifyContent: 'center',}}/>
				
				<Greeting name='Checked In' />
				<Greeting name='Good Day, Chris' />
				<Greeting name='How are you feeling?' />
				
				
			</View>
			
			<Text style={{ fontWeight:'bold', color: '#FFFFFF',justifyContent:'center',marginLeft: 55,fontSize: 25 ,marginTop: 35,}}>
			{this.state.Loading}</Text>	
			
			
		</View>
		<View style={styles.container3}>
		
			<TouchableHighlight onPress={this.update1}  style={styles.container31} underlayColor="green">
				<View >
					<Image source={require('./assets/foot-icon1.png')} style={{width: 25, height: 25}} />			
					<Greeting name='CheckIn' /> 
				</View>
			</TouchableHighlight>
			
			
			<TouchableHighlight onPress={this.update2}  style={styles.container31} underlayColor="green">
				<View> 			  
					<Image source={require('./assets/foot-icon2.png')} style={{width: 25, height: 25}} />
					<Greeting name='Guide' />			  
				</View>
			</TouchableHighlight>
			
			<TouchableHighlight onPress={this.update3}  style={styles.container31} underlayColor="green">
			<View  >
				<Image source={require('./assets/foot-icon3.png')} style={{width: 25, height: 25}} />
				<Greeting name='Activities' /> 
			</View>
			</TouchableHighlight>
			
			
			<TouchableHighlight onPress={this.update4}  style={styles.container31} underlayColor="green">
			<View  >
				<Image source={require('./assets/foot-icon4.png')} style={{width: 25, height: 25}} />
				<Greeting name='Community' /> 
			</View>
			</TouchableHighlight>
			
			
			
			<TouchableHighlight onPress={this.update5}  style={styles.container31} underlayColor="green">			
			<View  >
				<Image source={require('./assets/foot-icon5.png')} style={{width: 25, height: 25}} />
				<Greeting name='Therapy' /> 
			</View>
			</TouchableHighlight>
		</View>
      </View>
	  </ImageBackground>
    );
  }
}



const styles = StyleSheet.create({
	backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
  container: {
    flex: 1,	
    backgroundColor: '#00000000',
    alignItems: 'flex-start',
    //justifyContent: 'flex-end',
	height: '100%',
	width: '100%',
  },
  container2: {
    flex: 2,
    backgroundColor: '#00000000',
    alignItems: 'flex-start',
    //justifyContent: 'flex-end',
	height: '50%',
	width: '100%',
	marginTop: 22,
	//alignItems: 'stretch',
    //justifyContent: 'stretch',
  },
  container3: {
    flex: 1,
	flexDirection: 'row',
	justifyContent: 'space-between',
    backgroundColor: '#00000000',
    alignItems: 'flex-end',
   // justifyContent: '',
	height: '5%',
	width: '100%',
  },
  container31: {   
	flex: 1,  
	width: 50,
	height: 50,
	borderColor: '#7a42f4',
		borderWidth: 1,
		//fontSize: 6, 
		//color: '#919191', 		
		backgroundColor: '#232323',	
		alignItems: 'center',
		//justifyContent: 'center',
  }
});
