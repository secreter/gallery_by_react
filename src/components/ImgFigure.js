import React from 'react';
class ImgFigure extends React.Component {
  render(){
    return (
      <figure className="img-figure">
        <img src={'../images/'+ this.props.data.name} alt={this.props.data.title}/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
}

export default ImgFigure
