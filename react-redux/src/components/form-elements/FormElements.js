import {Input,Row,Autocomplete} from 'react-materialize'
import React from 'react'
const renderTextField = ({input,placeHolder, readonly,onKeyUp}) => {
	 if(readonly==="true"){
	 	return(<input type="text" placeholder={placeHolder} readOnly {...input}/>

		)
	}
	 return(<input type="text" placeholder={placeHolder}  {...input} onKeyUp={onKeyUp}/>

	)
	
}


const renderSelect = ({input,className,s,l,m,children,label}) => (
	<Input type='select' s={s} m={m} l={l} label={label} className={className} children={children}  {...input} onChange={input.onChange}/>
	)


const renderTextArea = ({input, className,cols,rows,label}) => (
<textarea style={{height:"250px"}} rows={rows} cols={cols}  className={className} {...input} placeholder={label} ></textarea>
			  	)
const renderCheckBox = ({input, className,label,id}) => (
		<Input type="checkbox" id={id} className={className} defaultChecked={input.value===true?'checked':''} label={label} onChange={input.onChange}/>
	)
const renderRadioButton = ({input,id,label,className}) => (
		<Input  type='radio' id={id} value={input.value} className={className} label={label} {...input}  defaultValue="Apple" searchText="Apple" />
	)
const renderAutoSuggest =({input}) =>(
 <Row>
  <Autocomplete
    title='Company'
    data={
      {
        'Apple': null,
        'Microsoft': null,
        'Google': null
      }
    }
  {...input} />
</Row>

	)

module.exports = {
	renderTextField,
	renderSelect,
	renderTextArea,
	renderCheckBox,
	renderRadioButton,
	renderAutoSuggest
}