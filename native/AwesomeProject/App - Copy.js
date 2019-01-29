import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,ImageBackground, AppRegistry } from 'react-native';
import Greeting from './components/Greeting';

export default class App extends Component {
  render() {
	let pic = {
      uri: './assets/Bananavarieties.jpg'
	};
      
	let pic2 = {
      uri2: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
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
        source={require('./assets/Bananavarieties.jpg')}
      >
      <View style={styles.container}>
		<View style={styles.container2}>
			<Text>654Open up App.js to start working on your app!</Text>
			<Image source={pic} style={{width: 193, height: 110}}/>
			<Image source={require('./assets/logo.png')} style={{ height: 95}}/>
			
			<Greeting name='CHECK-IN' />
			<Greeting name='Good Day, Chris' />
			<Greeting name='How are you feeling?' />
		</View>
		<View style={styles.container3}>
			<View style={styles.container31} >
				<Image source={require('./assets/foot-icon1.png')} style={{width: 25, height: 25}} />			
				<Greeting name='CheckIn' /> 
			</View>
			<View style={styles.container31} > 
				<Image source={require('./assets/foot-icon2.png')} style={{width: 25, height: 25}} />
				<Greeting name='Guided Paths' />
			</View>
			<View style={styles.container31} >
				<Image source={require('./assets/foot-icon3.png')} style={{width: 25, height: 25}} />
				<Greeting name='Activities' /> 
			</View>
			<View style={styles.container31} >
				<Image source={require('./assets/foot-icon4.png')} style={{width: 25, height: 25}} />
				<Greeting name='Community' /> 
			</View>
			<View style={styles.container31} >
				<Image source={require('./assets/foot-icon5.png')} style={{width: 25, height: 25}} />
				<Greeting name='Therapy' /> 
			</View>
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
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    //justifyContent: 'flex-end',
	height: '100%',
	width: '100%',
  },
  container2: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    //justifyContent: 'flex-end',
	height: '50%',
	width: '100%',
  },
  container3: {
    flex: 1,
	flexDirection: 'row',
	justifyContent: 'space-between',
    backgroundColor: '#fff',
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
		fontSize: 6, 
		color: '#919191', 		
		backgroundColor: '#232323',	
		alignItems: 'center',
		//justifyContent: 'center',
  }
});
