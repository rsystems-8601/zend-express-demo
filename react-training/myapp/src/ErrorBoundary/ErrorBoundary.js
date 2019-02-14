import React,{Component} from 'react';
class ErrorBoundary extends Component{
    state = {
        hasError:false,
        errormessage:null
    };
     componentDidCatch = (error,info) => {
         this.setState({hasError:true,errormessage:error});
     }
    render(){
      if(this.state.hasError){
          return <h1>{this.state.errormessage}</h1>
      }
      else {
        return (
            <div>{this.props.children}</div>
        );
      }
    }
}

export default ErrorBoundary;