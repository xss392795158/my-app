import React, { Component } from 'react';
class ImgFigure extends Component {
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
        let styleObj = {}
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }
        if(this.props.arrange.rotate){
            (['moZ','ms','webkit','']).forEach(function(value){
                styleObj[value+'transform'] = 'rotate('+this.props.arrange.rotate+'deg)';
            }.bind(this));
        }
        let imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse?' is-inverse':'';
        return (
        <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
            <img src={this.props.data.imgUrl} alt={this.props.data.title} width="200" height="200"/>
            <figcaption>
                <h2>{this.props.data.title}</h2>
                <div className="img-back" onClick={this.handleClick.bind(this)}>
                    <p>{this.props.data.desc}</p>
                </div>
            </figcaption>
        </figure>
        )
    }
}


export default ImgFigure;
