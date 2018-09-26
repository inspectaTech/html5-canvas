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
  componentDidMount() {
    console.log("myCanvas mounted");
    // var canvas = document.getElementById('canvas'),
    // context = canvas.getContext('2d'),
    // image = new Image();
    // image.src = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';
    // image.onload = function(e) {
    // context.drawImage(image, 0, 0);
    // };

  }
  render(){
      return (
        <div>
        <h1>New canvas element</h1>
        <canvas id="canvas" className="canvas"></canvas>
        </div>
      );
    }//render
  }

export default myCanvas;
