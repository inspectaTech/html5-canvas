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
      image : new Image(),
      canvas : "",
      context : ""
    }; // state

    componentDidMount = () => {
      //this section is for setting up initial values just after page is rendered
      console.log("the componentDidMount");
      let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      FONT_HEIGHT = 15,
      MARGIN = 13,
      HAND_TRUNCATION = canvas.width/25,
      NUMBERAL_SPACING = canvas.width/10,
      RADIUS = canvas.width/2 - MARGIN,
      HAND_RADIUS = RADIUS + NUMBERAL_SPACING;

      this.setState({
        canvas,
        context,
        FONT_HEIGHT,
        MARGIN,
        HAND_TRUNCATION,
        NUMBERAL_SPACING,
        RADIUS,
        HAND_RADIUS
      });//setState

    };// componentDidMount

    componentDidUpdate = () => {
      //this section is for executing just after first state update - all init vars are set by now
      console.log("the componentDidUpdate")
        // let boss = this.state;
        this.drawClock();

    }; // componentDidUpdate

    drawClock = () => {
      let boss = this.state;
      boss.context.clearRect(0,0,boss.canvas.width,boss.canvas.height);

      this.drawCircle();
    }

    drawCircle = () => {
      let boss = this.state;
      boss.context.beginPath();
      boss.context.arc(boss.canvas.width/2, boss.canvas.height/2, boss.RADIUS, 0,2*Math.PI, true);
      boss.context.stroke();
      boss.context.fillStyle = "yellow";
      boss.context.fill();
    }

  render(){
      return (
        <div>
        <h1>New canvas element</h1>
        <canvas id="canvas" className="canvas" width="600" height="600"></canvas>
        {/*css width and height didn't help the poor canvas distorted display - needed hardcode*/ }
        </div>
      );
    }//render
  }// class

export default myCanvas;
