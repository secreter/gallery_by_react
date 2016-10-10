import React from 'react';
import classList from 'classnames'
class ImgFigure extends React.Component {

  handleClick=function(e){
    console.log(this.props.arrange)
    if(this.props.arrange.isCenter){
      this.props.inverse()
    }else{
      this.props.center()
    }

    e.stopPropagation()
    e.preventDefault()
  }.bind(this)
  render(){
    var img=require('../images/'+ this.props.data.name);
    var styleObj=this.props.arrange.pos
    if(this.props.arrange.rotate){
      (['transform','WebkitTransform','MozTransform','MsTransform']).forEach((val)=>{
        styleObj[val]='rotate('+this.props.arrange.rotate+'deg)'
      })
    }
    if(this.props.arrange.isCenter){
      styleObj['zIndex']=111
    }
    var classes=classList({"img-figure":true,'is-inverse':this.props.arrange.isInverse})
    return (
      <figure className={classes} style={styleObj} onClick={this.handleClick}>
        <div className="img-front">
          <img src={img} alt={this.props.data.title}/>
          <figcaption>
            <h2>{this.props.data.title}</h2>
          </figcaption>
        </div>
        <div className="img-back" onClick={this.handleClick}>
          <p>{this.props.data.desc}</p>
        </div>
      </figure>
    )
  }
}

export default ImgFigure
