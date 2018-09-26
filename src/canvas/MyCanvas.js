import React from 'react';
import './MyCanvas.css';

// this is a function component - it takes properties it doesn't have its own state
// const myCanvas = () => {
//       return (
//         <div>
//         <h1>New canvas element</h1>
//         <canvas id="canvas"></canvas>
//         </div>
//       )
//   }
//
// export default myCanvas;

// [using canvas with react](https://blog.lavrton.com/using-react-with-html5-canvas-871d07d8d753)
class myCanvas extends React.Component {
  // this is a function component - it takes properties it doesn't have its own state

  state={
    image : new Image(),
    canvas:"",
    context:"",
    scaleSlider:"",
    scale : 1.0,
    MINIMUM_SCALE : 1.0,
    MAXIMUM_SCALE : 3.0
  }

  componentDidMount() {
    console.log("the componentDidMount");
    let boss = this.state,
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    scaleSlider = document.querySelector('.checker'),
    scaleOutput = document.getElementById('scaleOutput');

    this.setState({
        canvas,
        context,
        scaleSlider,
        scaleOutput
      });
      console.log("setting state");
      console.log("context = ",context);

  }//componentDidMount

  componentDidUpdate = () => {
    console.log("the componentDidUpdate");
  let boss = this.state;
    // Initialization......................................................
    console.log("running Initialization");
    console.log("boss = ",boss);
    boss.context.fillStyle = 'cornflowerblue';
    boss.context.strokeStyle = 'yellow';
    boss.context.shadowColor = 'rgba(50, 50, 50, 1.0)';
    boss.context.shadowOffsetX = 5; boss.context.shadowOffsetY
    = 5;
    boss.context.shadowBlur = 10;
    boss.image.src = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';
    boss.image.onload = (e) => {
      this.drawImage();
      this.drawScaleText(boss.scaleSlider.value);

      //this.state.scaleSlider.onchange = changeMe;
    };
  };//then

  changeMe = (e) => {
    let boss = this.state;
    boss.scale = e.target.value;
    if (boss.scale < boss.MINIMUM_SCALE) boss.scale = boss.MINIMUM_SCALE;
    else if (boss.scale > boss.MAXIMUM_SCALE) boss.scale = boss.MAXIMUM_SCALE;
    this.drawScaleText(boss.scale);
    this.drawImage();
  };//scaleSlider

  drawImage = () => {
    let boss = this.state;
    let canvas = boss.canvas,
    context = boss.context;
    var w = canvas.width,
    h = canvas.height,
    sw = w * boss.scale,
    sh = h * boss.scale;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(boss.image, -sw/2 + w/2, -sh/2 + h/2, sw, sh);
  }

  drawScaleText = (value) => {
    let boss = this.state;
    var text = parseFloat(value).toFixed(2);
    var percent = parseFloat(value - boss.MINIMUM_SCALE) /
    parseFloat(boss.MAXIMUM_SCALE - boss.MINIMUM_SCALE);
    boss.scaleOutput.innerText = text;
    percent = percent < 0.35 ? 0.35 : percent;
    boss.scaleOutput.style.fontSize = percent*boss.MAXIMUM_SCALE/1.5 + 'em';
  }



  render(){
      return (
        <div>
        <h1>Zoom 3</h1>
        <div id='controls'>
          <output id='scaleOutput'>1.0</output>
          <input id='checker' className='checker' type='range'
          min='1' max='3.0' step='0.01' defaultValue='1.0' onChange={this.changeMe} />
        </div>
        <div id="canvas_cont" className="canvas_cont">
        <canvas id="canvas" className="canvas" width="1200" height="800"></canvas>
        </div>
        </div>
      );
    }//render
  }

export default myCanvas;
