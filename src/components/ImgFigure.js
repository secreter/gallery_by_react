import React from 'react';
class ImgFigure extends React.Component {
  render(){
    var styleObj=this.props.arrange.pos
    return (
      <figure className="img-figure" style={styleObj}>
        <img src={'../images/'+ this.props.data.name} alt={this.props.data.title}/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
}

export default ImgFigure
