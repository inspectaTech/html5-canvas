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
  state={}
  // this is a function component - it takes properties it doesn't have its own state
  componentDidMount =() => {
    console.log("the componentDidMount");
    let silverhawks = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg',
  	canvas = document.getElementById('canvas'),
  	context = canvas.getContext('2d'),
  	offscreenCanvas = document.createElement('canvas'),
  	offscreenContext = offscreenCanvas.getContext('2d'),
  	image = new Image(),
  	scaleSlider = document.getElementById('scaleSlider'),
    scaleOutput = document.getElementById('scaleOutput'),
  	canvasRadio = document.getElementById('canvasRadio'),
  	imageRadio = document.getElementById('imageRadio'),
  	scale = 1.0,
  	MINIMUM_SCALE = 1.0,
  	MAXIMUM_SCALE = 3.0;

    this.setState({
      silverhawks,
    	canvas,
    	context,
    	offscreenCanvas,
    	offscreenContext,
    	image,
    	scaleSlider,
      scaleOutput,
    	canvasRadio,
    	imageRadio,
    	scale,
    	MINIMUM_SCALE,
    	MAXIMUM_SCALE
    });





  }//componentDidMountc


  // Functions...........................................................

  drawScaled = () => {
    let boss = this.state;
    var w = boss.canvas.width,
    h = boss.canvas.height,
    sw = w * boss.scale,
    sh = h * boss.scale;
    boss.context.drawImage(boss.offscreenCanvas, 0, 0,
      boss.offscreenCanvas.width, boss.offscreenCanvas.height,
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

    drawWatermark = (context) => {
      let boss = this.state;
      var lineOne = 'Copyright',
      lineTwo = 'Acme, Inc.',
      textMetrics = null,
      FONT_HEIGHT = 128;
      context.save();
      context.fillStyle = 'rgba(100,140,230,0.5);';
      context.strokeStyle = 'yellow';
      context.shadowColor = 'rgba(50, 50, 50, 1.0)';
      context.shadowOffsetX = 5;
      context.shadowOffsetY = 5;
      context.shadowBlur = 10;
      context.font = FONT_HEIGHT + 'px Arial';
      textMetrics = context.measureText(lineOne);
      context.translate(boss.canvas.width/2, boss.canvas.height/2);
      context.fillText(lineOne, -textMetrics.width/2, 0);
      context.strokeText(lineOne, -textMetrics.width/2, 0);
      textMetrics = context.measureText(lineTwo);
      context.fillText(lineTwo, -textMetrics.width/2, FONT_HEIGHT);
      context.strokeText(lineTwo, -textMetrics.width/2, FONT_HEIGHT);
      context.restore();
    }

  componentDidUpdate = () => {
    console.log("the componentDidUpdate");
    let boss = this.state;
    // Initialization......................................................
  	boss.offscreenCanvas.width = boss.canvas.width;
  	boss.offscreenCanvas.height = boss.canvas.height;
  	// boss.image.src = boss.silverhawks;
    boss.image.src = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';

  	boss.image.onload = (e) => {
  		boss.context.drawImage(boss.image, 0, 0, boss.canvas.width, boss.canvas.height);
  		boss.offscreenContext.drawImage(boss.image, 0, 0,
  		boss.canvas.width, boss.canvas.height);
  		this.drawWatermark(boss.context); this.drawWatermark(boss.offscreenContext);
  		this.drawScaleText(boss.scaleSlider.value);
  	};



  	// scaleSlider.onchange = function(e) {
  	// 	scale = e.target.value;
  	// 	if (scale < MINIMUM_SCALE) scale = MINIMUM_SCALE;
  	// 	else if (scale > MAXIMUM_SCALE) scale = MAXIMUM_SCALE;
  	// 	drawScaled();
  	// 	drawScaleText(scale);
  	// }
  }//componentDidUpdate

  changeMe = (e) => {
    let boss = this.state;
    boss.scale = e.target.value;
    if (boss.scale < boss.MINIMUM_SCALE) boss.scale = boss.MINIMUM_SCALE;
    else if (boss.scale > boss.MAXIMUM_SCALE) boss.scale = boss.MAXIMUM_SCALE;
    this.drawScaled();
    this.drawScaleText(boss.scale);
  }

  render(){
      return (
        <div>
        <h1>Zoom 5</h1>
        <div id='controls'>
  				<output id='scaleOutput'>1.0</output>
  				<input id='scaleSlider' className='scaleSlider' type='range'
  				min='1' max='3.0' step='0.01' defaultValue='1.0' onChange={ this.changeMe } />
  			</div>
  			<div id="canvas_cont" className="canvas_cont">
  			<canvas id="canvas" className="canvas" width="1200" height="800"></canvas>
  			</div>
        </div>
      );
    }//render
  }

export default myCanvas;
