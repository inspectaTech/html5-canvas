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
        let boss = this.state;
        boss.image.src = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';
        boss.image.onload = function(e) {
          boss.context.drawImage(boss.image, 0, 0);
        }// onload
    }; // componentDidUpdate

  render(){
      return (
        <div>
        <h1>New canvas element</h1>
        <canvas id="canvas" className="canvas" width="450" height="275"></canvas>
        </div>
      );
    }//render
  }// class

export default myCanvas;
