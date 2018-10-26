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
    state = {
      canvas : "",
      context : "",
      image : new Image(),
      imageData:undefined,
      mousedown:{},
      rubberbandRectangle:{},
      dragging:false
    }; // state

    componentDidMount = () => {
      //this section is for setting up initial values just after page is rendered
      console.log("myCanvas mounted");
      let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      resetButton = document.getElementById('resetButton');

      this.setState({
        canvas,
        context,
        resetButton
      });//setState

    };// componentDidMount

    componentDidUpdate = () => {
      //this section is for executing just after first state update - all init vars are set by now
        let s = this.state,
        ctx = s.context;

        ctx.strokeStyle = 'navy';
        ctx.lineWidth = 1.0;

        // s.image.src = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';
        s.image.src = './images/crew2.jpg';
        s.image.onload = (e) => {
          s.context.drawImage(s.image, 0, 0, s.canvas.width, s.canvas.height);
        }// onload

        s.resetButton.onclick = (e) => {
          console.log('resetting btn');
          ctx.clearRect(0, 0, s.canvas.width, s.canvas.height);
          ctx.drawImage(s.image, 0, 0, s.canvas.width, s.canvas.height);
        }// resetButton

        s.canvas.onmousedown = (e) => {
          console.log("mousedown action");
          let loc = this.windowToCanvas(s.canvas, e.clientX, e.clientY);
          e.preventDefault();
          this.rubberbandStart(loc.x, loc.y);
        }// md

        s.canvas.onmousemove = (e) => {
          console.log("mousemove action");
          let loc;

          if(s.dragging){
            console.log("dragging action");
            loc = this.windowToCanvas(s.canvas, e.clientX, e.clientY);
            this.rubberbandStretch(loc.x, loc.y);
          }// if
        }// mm

        s.canvas.onmouseup = (e) => {
          console.log("mouseup action");
          this.rubberbandEnd();
        }// mu

    }; // componentDidUpdate

    windowToCanvas = function (canvas, x, y) {
      let s = this.state;

      let canvasRectangle = s.canvas.getBoundingClientRect();
      return {
        x: x - canvasRectangle.left,
        y: y - canvasRectangle.top
      }//return
    }// windowToCanvas

    captureRubberbandPixels = function () {
      let s = this.state,
      ctx = s.context;

      s.imageData = s.context.getImageData(
        s.rubberbandRectangle.left,
        s.rubberbandRectangle.top,
        s.rubberbandRectangle.width,
        s.rubberbandRectangle.height
      );
    }// captureRubberbandPixels

    restoreRubberbandPixels = function functionName() {
      let s = this.state,
      ctx = s.context;

      ctx.putImageData(s.imageData, s.rubberbandRectangle.left,
      s.rubberbandRectangle.top);
    }// restoreRubberbandPixels

    drawRubberband = function () {
      let s = this.state,
      ctx = s.context;

      ctx.strokeRect(s.rubberbandRectangle.left + ctx.lineWidth,
      s.rubberbandRectangle.top + ctx.lineWidth,
      s.rubberbandRectangle.width - 2 * ctx.lineWidth,
      s.rubberbandRectangle.height - 2 * ctx.lineWidth);
    }// drawRubberband

    setRubberbandRectangle = function (x, y) {
      let s = this.state,
      ctx = s.context;

      s.rubberbandRectangle.left = Math.min(x, s.mousedown.x);
      s.rubberbandRectangle.top = Math.min(y, s.mousedown.y);
      s.rubberbandRectangle.width = Math.abs(x - s.mousedown.x);
      s.rubberbandRectangle.height = Math.abs(y - s.mousedown.y);
    }// setRubberbandRectangle

    updateRubberband = function () {
      this.captureRubberbandPixels();
      this.drawRubberband();
    }// updateRubberband

    rubberbandStart = function (x, y) {
      let s = this.state,
      ctx = s.context;

      s.mousedown.x = x;
      s.mousedown.y = y;

      s.rubberbandRectangle.left = s.mousedown.x;
      s.rubberbandRectangle.top = s.mousedown.y;

      s.dragging = true;
    }// rubberbandStart

    rubberbandStretch = function (x, y) {
      let s = this.state,
      ctx = s.context;

      if(s.rubberbandRectangle.width > 2 * ctx.lineWidth &&
        s.rubberbandRectangle.height > 2 * ctx.lineWidth)
      {
        if(s.imageData !== undefined){
          this.restoreRubberbandPixels();
        }//if`
      }// if
    }// rubberbandStretch

    setRubberbandRectangle = function () {
      let s = this.state,
      ctx = s.context;

      console.log("setting rubberband");
      if(s.rubberbandRectangle.width > 2 * ctx.lineWidth &&
        s.rubberbandRectangle.height > 2 * ctx.lineWidth)
      {
        console.log("updating rubberband");
        this.updateRubberband();
      }// if
    }// setRubberbandRectangle

    rubberbandEnd = function () {
      let s = this.state,
      ctx = s.context;

      ctx.drawImage(s.canvas,
      s.rubberbandRectangle.left + ctx.lineWidth * 2,
      s.rubberbandRectangle.top + ctx.lineWidth * 2,
      s.rubberbandRectangle.width - 4 * ctx.lineWidth,
      s.rubberbandRectangle.height - 4 * ctx.lineWidth,
      0, 0, s.canvas.width, s.canvas.height);

      s.dragging = false;
      s.imageData = undefined;
    }// rubberbandEnd



  render(){
      return (
        <div className="canvas_display">
        <button id="resetButton">reset</button><h1>New canvas element</h1>
        <canvas id="canvas" className="canvas" width="450" height="275"></canvas>
        </div>
      );
    }//render
  }// class

export default myCanvas;
