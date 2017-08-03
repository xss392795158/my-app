import React, { Component } from 'react';
class ControllerUnit extends Component {
    componentDidMount(){
        // debugger;
    }
    handleClick(e) {
        debugger;
        if(this.props.arrange.isCenter){
            this.props.inverse();
            
        } else {
            this.props.center();  
        }
        
        e.stopPropagation();
        e.preventDefault();

    }

    render() {
        let controllerUnitClassName = 'controller-unit';
        if(this.props.arrange.isCenter){
            controllerUnitClassName += ' is-center';
            if(this.props.arrange.isCenter){
                controllerUnitClassName += ' is-inverse';
            }
        }
        
        return(
            <span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
        )
        
    }
}


export default ControllerUnit;
