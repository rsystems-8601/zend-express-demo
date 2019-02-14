import React from 'react';
import styles from './cockpit.module.css';
const cockpit = (props) => {
    const style = {
        backgroundColor:'red',
        fontFamily:'inherit',
        padding:'10px',
        color:'black',
        fontWeight:'bold',
        border:'1px solid blue'
        };
        let classes = [];
        if(props.persons.length <=2){
          classes.push(styles.red);
        }
        if(props.persons.length <=1){
          classes.push(styles.bold);
        }
        if(props.persons.length ==0){
          classes = [];
        }
        if(props.showPersons){
            style.backgroundColor = 'green';
        }
    return (
        <div>
    <h1>React APP!!</h1>
<p className={classes.join(' ')}>This is working</p>
<button style={style} onClick={props.click}>Change Name</button>
        </div>
      
    )
}

export default cockpit;