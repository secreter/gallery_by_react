import React from 'react';
import classList from 'classnames'
class ControlDot extends React.Component {

  handleClick=function(e){
    if(this.props.arrange.isCenter){
      this.props.inverse()
    }else{
      this.props.center()
    }

    e.stopPropagation()
    e.preventDefault()
  }.bind(this)
  render(){

    var classes=classList({"controller":true,'is-center':this.props.arrange.isCenter,'is-inverse':this.props.arrange.isInverse})
    return (
      <span className={classes} onClick={this.handleClick}></span>
    )
  }
}

export default ControlDot
