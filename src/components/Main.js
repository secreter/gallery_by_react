require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ImgFigure from './imgFigure.js';

let imageArr=require('../data/images.json');
let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  static defaultProps = {
    autoPlay: false,
    maxLoops: 10,
  };

  render() {
    let controllerUnits=[];
    let imgFigures=[];
    imageArr.forEach((obj,index) => {
      imgFigures.push(<ImgFigure key={'key_'+index} data={obj}/>)
    });
    return (
      //<div className="index">
      //  <img src={yeomanImage} alt="Yeoman Generator" />
      //  <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      //</div>
      <section className="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="img-nav">
          {controllerUnits}
        </nav>

      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
