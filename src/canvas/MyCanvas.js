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
      repeatRadio = document.getElementById('repeatRadio'),
      noRepeatRadio = document.getElementById('noRepeatRadio'),
      repeatXRadio = document.getElementById('repeatXRadio'),
      repeatYRadio = document.getElementById('repeatYRadio'),
      image = new Image();

      this.setState({
        canvas,
        context,
        repeatRadio,
        noRepeatRadio,
        repeatXRadio,
        repeatYRadio,
        image
      });//setState

    };// componentDidMount

    componentDidUpdate = () => {
      //this section is for executing just after first state update - all init vars are set by now
      // attach to document elements using the state
        let s = this.state,
        sc = s.context;
        s.image.src = './images/fishy_sm.png';
        s.image.onload = (e) => {
          // sc.drawImage(s.image, 0, 0);
          this.fillCanvasWithPattern('repeat');
        }// onload
        s.image.onerror = (e) => {
          console.log(`image error`,e);
        }//onerror

        s.repeatRadio.onclick = (e) => {
          this.fillCanvasWithPattern('repeat');
        };
        s.repeatXRadio.onclick = (e) => {
          this.fillCanvasWithPattern('repeat-x');
        };
        s.repeatYRadio.onclick = (e) => {
          this.fillCanvasWithPattern('repeat-y');
        };
        s.noRepeatRadio.onclick = (e) => {
          this.fillCanvasWithPattern('no-repeat');
        };

    }; // componentDidUpdate

    // functions

    fillCanvasWithPattern = (repeatString) => {
      let s = this.state,
      sc = s.context,
      pattern = sc.createPattern(s.image, repeatString);
      sc.clearRect(0,0, s.canvas.width, s.canvas.height);
      sc.fillStyle = pattern;
      sc.fillRect(0, 0, s.canvas.width, s.canvas.height);
      s.context.fill();
    }//fillCanvasWithPattern

    // event handlers


  render(){
      return (
        <div>
        <h1>Canvas Patterns</h1>
        <div>
          <input id="repeatRadio" type="radio" name="patternRadio" defaultChecked />repeat
          <input id="repeatXRadio" type="radio" name="patternRadio"  />repeat-x
          <input id="repeatYRadio" type="radio" name="patternRadio" />repeat-y
          <input id="noRepeatRadio" type="radio" name="patternRadio" />no-repeat
        </div>
        <canvas id="canvas" className="canvas" width="450" height="275"></canvas>
        </div>
      );
    }//render
  }// class

export default myCanvas;
