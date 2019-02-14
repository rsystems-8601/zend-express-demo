import React,{Component} from 'react';
import Person from './Person/Person';
/* const persons = (props) => {
    return (
      props.persons.map(
          (p,index) => {
              return (
                  <Person 
                  key={p.id} 
                  name={p.name} 
                  age={p.age}
                  click={() =>props.delete(index)}
                  input={(event) => props.inputChange(event,p.id)}

                   />
              )
          }
      )
    );
} */
class Persons extends Component
{
    constructor(props){
        console.log('[Persons.js] construtor is called');
        super(props);
        
    
      }
    
      componentWillMount(){
        console.log('[Persons.js] componentWillMount is called');
      }
    
      componentDidMount(){
        console.log('[Persons.js] componentDidMount is called');
      }
    
    render(){
        console.log('[Persons.js] render is called');
        return (
            this.props.persons.map(
                (p,index) => {
                    return (
                        <Person 
                        key={p.id} 
                        name={p.name} 
                        age={p.age}
                        click={() =>this.props.delete(index)}
                        input={(event) => this.props.inputChange(event,p.id)}
      
                         />
                    )
                }
            )
          );
    }
}

export default Persons;


















