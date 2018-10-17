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
      console.log("myCanvas mounted");
      let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      SHADOW_COLOR = 'rgba(0,0,0,0.7)';

      this.setState({
        canvas,
        context,
        SHADOW_COLOR
      });//setState

    };// componentDidMount

    componentDidUpdate = () => {
      //this section is for executing just after first state update - all init vars are set by now
        let s = this.state,
        ctx = s.context;

        ctx.fillStyle = 'goldenrod';
        this.draw();
        // boss.image.src = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';
        // boss.image.onload = function(e) {
        //   boss.context.drawImage(boss.image, 0, 0);
        // }// onload
    }; // componentDidUpdate

    draw = () => {
      let s = this.state,
      ctx = s.context;

      ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
      this.drawGrid('lightgray', 10, 10);

      ctx.save();

      ctx.shadowColor = 'rgba(200,200,0,0.5)';
      ctx.shadowOffsetX = 12;
      ctx.shadowOffsetY = 12;
      ctx.shadowBlur = 15;

      this.drawCutouts();
      this.strokeCutoutShapes();
      ctx.restore();

    }// draw

    drawGrid = (color, stepx, stepy) =>
    {
      let s = this.state,
      ctx = s.context;

      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;

      for(let i = stepx + 0.5; i < ctx.canvas.width; i += stepx){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, ctx.canvas.height);
        ctx.stroke();
      }// for

      for(let i = stepy + 0.5; i < ctx.canvas.height; i += stepy){
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(ctx.canvas.width, i);
        ctx.stroke();
      }
    }// drawGrid


    drawCutouts = () =>
    {
      let s = this.state,
      ctx = s.context;

      ctx.beginPath();
      this.addOuterRectanglePath();

      this.addCirclePath();
      this.addRectanglePath();
      this.addTrianglePath();

      ctx.fill();// cut out shapes

    }// drawCutouts

    strokeCutoutShapes = () =>
    {
      let s = this.state,
      ctx = s.context;

      ctx.save();

      ctx.strokeStyle = 'rgba(0,0,0,0.7)';

      ctx.beginPath();
      this.addOuterRectanglePath();
      ctx.stroke();

      ctx.beginPath();

      this.addCirclePath();
      this.addRectanglePath();
      this.addTrianglePath();

      ctx.stroke();

      ctx.restore();

    }// strokeCutoutShapes

    rect = (x, y, w, h, direction) =>
    {
      let s = this.state,
      ctx = s.context;
      if(direction){
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x + w, y);
        ctx.closePath();
      }else {
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.closePath();
      }//if
    }

    addOuterRectanglePath = () =>
    {
      let s = this.state,
      ctx = s.context;

      ctx.rect(110, 25, 370, 335);
    }// addOuterRectanglePath

    addCirclePath = () =>
    {
      let s = this.state,
      ctx = s.context;

      ctx.arc(300, 300, 40, 0, Math.PI*2, true)
    }// addCirclePath

    addRectanglePath = () =>
    {
      this.rect(310,55, 70, 35, true);
    }// addRectanglePath

    addTrianglePath = () =>
    {
      let s = this.state,
      ctx = s.context;

      ctx.moveTo(400, 200);
      ctx.lineTo(250, 115);
      ctx.lineTo(200, 200);
      ctx.closePath();
    }

  render(){
      return (
        <div>
        <h1>New canvas element</h1>
        <canvas id="canvas" className="canvas" width="550" height="375" ></canvas>
        </div>
      );
    }//render
  }// class

export default myCanvas;
