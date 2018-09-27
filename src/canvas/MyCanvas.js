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
      MARGIN = 40,
      HAND_TRUNCATION = canvas.width/25,
      HOUR_HAND_TRUNCATION = canvas.width/10,
      NUMERAL_SPACING = 20,
      RADIUS = canvas.width/2 - MARGIN,
      HAND_RADIUS = RADIUS + NUMERAL_SPACING;

      this.setState({
        canvas,
        context,
        FONT_HEIGHT,
        MARGIN,
        HAND_TRUNCATION,
        HOUR_HAND_TRUNCATION,
        NUMERAL_SPACING,
        RADIUS,
        HAND_RADIUS
      });//setState

    };// componentDidMount

    componentDidUpdate = () => {
      //this section is for executing just after first state update - all init vars are set by now
      console.log("the componentDidUpdate")
        let s = this.state,
        ctx = s.context;

        ctx.font = `${s.FONT_HEIGHT}px Arial`;
        var loop = setInterval(this.drawClock, 1000);

    }; // componentDidUpdate

    drawClock = () => {
      let s = this.state;
      s.context.clearRect(0,0,s.canvas.width,s.canvas.height);

      this.drawCircle();
      this.drawCenter();
      this.drawHands();
      this.drawNumerals();
    }

    drawCircle = () => {
      let s = this.state;
      s.context.beginPath();
      s.context.arc(s.canvas.width/2, s.canvas.height/2, s.RADIUS, 0,2*Math.PI, true);
      s.context.stroke();
    }

    drawNumerals = () => {
      let s = this.state;
      let ctx = s.context;
      let numerals = [1,2,3,4,5,6,7,8,9,10,11,12],
      angle = 0,
      numeralWidth = 0;

      // console.log(`Math.PI/6 = ${Math.PI/6}`);
      numerals.forEach((numeral) => {
        angle = Math.PI/6 * (numeral - 3);
        // console.log(`numeral ${numeral} angle = ${angle}`);
        numeralWidth = ctx.measureText(numeral).width;
        ctx.fillText(
          numeral,
          s.canvas.width/2 + Math.cos(angle) * (s.HAND_RADIUS) - numeralWidth/2,
          s.canvas.height/2 + Math.sin(angle) * (s.HAND_RADIUS) + s.FONT_HEIGHT/3
        );// fillText
      });// forEach

      // i can't figure out how to make the text bigger. maybe its later
    }// drawNumerals

    drawCenter = () => {
      let s = this.state;
      let ctx = s.context;

      ctx.beginPath();
      ctx.arc(s.canvas.width/2, s.canvas.height/2, 5, 0, Math.PI*2, true);
      ctx.fill();
    }// drawCenter

    drawHand = (loc, isHour) => {
      let s = this.state,
      ctx = s.context,
      angle = (Math.PI*2) * (loc/60) - Math.PI/2,
      handRadius = isHour ? s.RADIUS - s.HAND_TRUNCATION - s.HOUR_HAND_TRUNCATION :
      s.RADIUS - s.HAND_TRUNCATION;

      console.log(`angle = ${angle}`);

      ctx.moveTo(s.canvas.width/2, s.canvas.height/2);
      ctx.lineTo(s.canvas.width/2 + Math.cos(angle)*handRadius,
      s.canvas.height/2 + Math.sin(angle)*handRadius);
      ctx.stroke();

    }// drawHand

    drawHands = () => {
      let date = new Date(),
      hour = date.getHours();

      hour = hour > 12 ? hour - 12 : hour;
      console.log(`minute calc = ${hour*5 + (date.getMinutes()/60)*5}`);
      this.drawHand(hour*5 + (date.getMinutes()/60)*5, true, 0.5);
      this.drawHand(date.getMinutes(), false, 0.5);
      this.drawHand(date.getSeconds(), false, 0.2);
    }// drawHands



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
