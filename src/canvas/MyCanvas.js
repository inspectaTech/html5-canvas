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
  //'container' because its a component that contains something about the app state
  state = {image : new Image()};
  componentDidMount() {
    this.state.image.src = 'https://i.ytimg.com/vi/hjVN4KQY_Ko/maxresdefault.jpg';
    console.log("myCanvas mounted");
    	this.state.image.onload = this.drawImage();

  };

  drawImage = () => {

    let canvas = document.getElementById('canvas'),
    image = this.state.image,
    context = canvas.getContext('2d'),
    checker = document.querySelector(".checker");
    checker.style.borderColor="red";

    //see if checker is working
    console.log(`checker = ${checker.checked}`);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(checker.checked == true){

      //see if canvas is working
      console.log(`canvas = ${canvas.width}`)

      //or i can start with a different destination x and y
      context.drawImage(image,30,200,canvas.width,canvas.height);

      context.drawImage(image,0,0,canvas.width,canvas.height);

    }else{
      context.drawImage(image, 0, 0);
    }
  }//end drawImage

  render(){
    // i can write regular js in this section
      return (
        <div>
        <h1>Zoom 2</h1>
        <label>redraw canvas</label>
        <input className="checker" type="checkbox" onClick={this.drawImage}/>
        <div className="canvas_cont">
        <canvas id="canvas" className="canvas" ></canvas>
        </div>
        </div>
      );
    }//render
  }

export default myCanvas;
