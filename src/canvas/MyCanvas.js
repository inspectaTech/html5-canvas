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
      context = canvas.getContext('2d');

      this.setState({
        canvas,
        context
      });//setState

    };// componentDidMount

    componentDidUpdate = () => {
      //this section is for executing just after first state update - all init vars are set by now
      let s = this.state;
      let ctx = s.context;

      ctx.lineJoin = 'round';
      ctx.lineWidth = 30;
      ctx.font = '24px Helvetica';
      ctx.fillText('Click anywhere to erase',175,200);// formerly ,40)

      ctx.strokeStyle = 'antiquewhite';// #1 color - goldenrod
      ctx.strokeRect(75,100,200,200);// this must be rectangle #1

      ctx.fillStyle = 'rgba(0,0,255,0.5)';// #2 fill - the 0.5 section represents transparency
      ctx.fillRect(325,100,200,200);// #2

      ctx.canvas.onmousedown =  (e) => {
        ctx.clearRect(0, 0, s.canvas.width, s.canvas.height);
      };// mousedown

    }; // componentDidUpdate

  render(){
      return (
        <div>
          <h1>New canvas element</h1>
          <div className="canvas_cont">
            <canvas id="canvas" className="canvas" height="600" width="600" ></canvas>
          </div>
        </div>
      );
    }//render
  }// class

export default myCanvas;
