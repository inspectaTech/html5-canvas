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

      this.drawCircles();
    }

    drawCircles = () => {
      let boss = this.state;

      let point_zero = 0*Math.PI;
      let half_circle = 1*Math.PI;
      let full_circle = 2*Math.PI;
      let t_qtr_circle = .5*Math.PI;
      let qtr_circle = 1.5*Math.PI;
      let clockwise = true;

      let startpoint = point_zero,
      endpoint = t_qtr_circle,// this seems to tell canvas where to start the arc
      center_w = boss.canvas.width/2,
      center_h = boss.canvas.height/2,

      x_coord = center_w,
      y_coord = center_h,

      full_size_radius = boss.RADIUS,
      smaller_radius = 100,
      medium_radius = 200,
      radius = full_size_radius;

      // circle hint
      // https://www.w3schools.com/tags/canvas_arc.asp
      boss.context.beginPath();
      boss.context.arc(x_coord, y_coord, radius, startpoint, endpoint, clockwise);
      boss.context.lineWidth=5;
      boss.context.strokeStyle="red";
      boss.context.stroke();
      boss.context.closePath();
      boss.context.fillStyle = "green";
      boss.context.fill();


      let circles = [
        {f_color:"yellow",s_color:"blue", x:center_w, y:center_h, radius:medium_radius},
        {f_color:"blue",s_color:"red" ,x:center_w, y:center_h, radius:smaller_radius}
      ]

      circles.forEach( (entry) =>{

        boss.context.beginPath();
        boss.context.arc(entry.x, entry.y, entry.radius, 0, 2*Math.PI, clockwise);
        boss.context.stroke();
        boss.context.fillStyle = entry.f_color;
        boss.context.fill();
      });

      boss.context.font="50px Courier";
      boss.context.strokeText("Big smile!",10,100);
      boss.context.stroke();
    }// circles

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
