import React,{Component} from 'react';
import styles from './Person.module.css';
 const person = (props) => {
    /*   const rnd = Math.random();
    if(rnd > 0.7){
     throw new Error('Something Went Wrong');
    }  */
    return (
        <div className={styles.Person}>
            {/* <h1 onClick={props.click}>{props.name}</h1>
            <p>{props.age}</p> */}
            <p onClick={props.click}>I amf {props.name} with the age of {props.age}</p>
            <input type="text" value={props.name} onChange={props.input} />
            
           
        </div>
    )
}
 



export default person;