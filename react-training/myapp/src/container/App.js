import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/cockpit/cockpit';
import styles from './App.module.css';

class App extends Component {

  constructor(props){
    console.log('[App.js] construtor is called');
    super(props);
    this.state = {
      persons:[
        {id:1,name:'Max',age:34},
        {id:2,name:'Manu',age:35}
      ],
      showPersons:false
     
    }

  }

  componentWillMount(){
    console.log('[App.js] componentWillMount is called');
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount is called');
  }


  inputChangeHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(
      (p) => {
        return p.id === id;
      }
    );
   const person = {
     ...this.state.persons[personIndex]
   };
   person.name = event.target.value;
   const persons = [...this.state.persons];
   persons[personIndex] = person;
   this.setState({
     persons
   });

  }
  toggleHandler = () => {
  
    this.setState({
      showPersons:!this.state.showPersons
    })
  };
  //for delete 
  deleteHandler = (index) => {
   const persons = [...this.state.persons];
   persons.splice(index,1);
   this.setState({
     persons
   });
  }
  render() {
    console.log('[App.js] render is called');
   
    let person = null;
    if(this.state.showPersons){
      
      person = (
        <div>
          <Persons persons={this.state.persons} 
           delete ={this.deleteHandler}
           inputChange={this.inputChangeHandler}
            />
      
        </div>
      );
    }
    
     return (
	 
      <div className={styles.App}>
	  
	   {person}
	   
      <Cockpit click={this.toggleHandler} 
      showPersons={this.state.showPersons}
      persons={this.state.persons}/>
     
        
       
        
        
        
      </div>
    ); 
 
    
  }
}

export default App;
