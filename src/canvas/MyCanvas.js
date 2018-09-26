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
  componentDidMount = () => {
    console.log("the componentDidMount");

    let silverhawks = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';

  	let canvas = document.getElementById('canvas'),
  	context = canvas.getContext('2d'),
    scaleOutput = document.getElementById('scaleOutput'),
    scaleSlider = document.getElementById('scaleSlider'),
  	image = new Image(),
  	// scale = scaleSlider.value,
  	scale = 1.0,
    glassSize = 150,
  	MINIMUM_SCALE = 1.0,
  	MAXIMUM_SCALE = 3.0;

    this.setState({
      silverhawks,
      canvas,
    	context,
      scaleOutput,
      scaleSlider,
    	image,
    	scale,
      glassSize,
    	MINIMUM_SCALE,
    	MAXIMUM_SCALE
    });//setState
  	// Functions...........................................................


  	// Event handlers......................................................
  	// scaleSlider.onchange = function(e) {
  	// 	scale = e.target.value;
  	// 	if (scale < MINIMUM_SCALE) scale = MINIMUM_SCALE;
  	// 	else if (scale > MAXIMUM_SCALE) scale = MAXIMUM_SCALE;
  	// 	drawScaled();
  	// 	drawScaleText(scale);
  	// }

  }//componentDidMount

  changeMe = (e) => {
    let boss = this.state;
    boss.scale = e.target.value;
    if (boss.scale < boss.MINIMUM_SCALE) boss.scale = boss.MINIMUM_SCALE;
    else if (boss.scale > boss.MAXIMUM_SCALE) boss.scale = boss.MAXIMUM_SCALE;
    this.drawScaled();
    this.drawScaleText(boss.scale);
  }

  drawScaled = () => {
    let boss = this.state;
    var w = boss.canvas.width,
    h = boss.canvas.height,
    sw = w * boss.scale,
    sh = h * boss.scale;
    // Clear the canvas, and draw the image scaled to canvas size
    boss.context.clearRect(0, 0, boss.canvas.width, boss.canvas.height);
    boss.context.drawImage(boss.image, 0, 0, boss.canvas.width, boss.canvas.height);
    // Draw the watermark on top of the image
    this.drawWatermark();
    // Finally, draw the canvas scaled according to the current
    // scale, back into itself. Note that the source and
    // destination canvases are the same canvas.
    boss.context.drawImage(boss.canvas, 0, 0, boss.canvas.width, boss.canvas.height,
    -sw/2 + w/2, -sh/2 + h/2, sw, sh);
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

  drawWatermark = () => {
    let boss = this.state;
    var lineOne = 'Copyright',
    lineTwo = 'Acme Inc.',
    textMetrics,
    FONT_HEIGHT = 128;
    boss.context.save();
    boss.context.font = FONT_HEIGHT + 'px Arial';
    textMetrics = boss.context.measureText(lineOne);
    boss.context.globalAlpha = 0.6;
    boss.context.translate(boss.canvas.width/2,
    boss.canvas.height/2-FONT_HEIGHT/2);
    boss.context.fillText(lineOne, -textMetrics.width/2, 0);
    boss.context.strokeText(lineOne, -textMetrics.width/2, 0);
    textMetrics = boss.context.measureText(lineTwo);
    boss.context.fillText(lineTwo, -textMetrics.width/2, FONT_HEIGHT);
    boss.context.strokeText(lineTwo, -textMetrics.width/2, FONT_HEIGHT);
    boss.context.restore();
  }

  componentDidUpdate = () =>  {
    let boss = this.state;
    // Initialization......................................................
    boss.context.fillStyle = 'cornflowerblue';
    boss.context.strokeStyle = 'yellow';
    boss.context.shadowColor = 'rgba(50, 50, 50, 1.0)';
    boss.context.shadowOffsetX = 5; boss.context.shadowOffsetY
    = 5;
    boss.context.shadowBlur = 10;
    // var glassSize = 150;
    // var scale = 1.0;

    boss.image.src = boss.silverhawks;
      boss.image.onload = (e) => {
      boss.context.drawImage(boss.image, 0, 0, boss.canvas.width, boss.canvas.height);
      this.drawWatermark();
      this.drawScaleText(boss.scaleSlider.value);
    };

  }//componentDidUpdate
  render(){
      return (
        <div>
        <h1>Zoom 4</h1>
        <div id='controls'>
  				<output id='scaleOutput'>1.0</output>
  				<input id='scaleSlider' className='scaleSlider' type='range'
  				min='1' max='3.0' step='0.01' defaultValue='1.0' onChange={this.changeMe}/>
  			</div>
  			<div id="canvas_cont" className="canvas_cont">
  			<canvas id="canvas" className="canvas" width="1200" height="800"></canvas>
  			</div>
        </div>
      );
    }//render
  }

export default myCanvas;
