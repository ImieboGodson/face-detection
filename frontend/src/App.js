import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
 apiKey: '5728e3fbafb04d049b35e2da4568c28f'
});

const paramsOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
    }
  }

calculateFacePosition = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputImage');
  const imageWidth = Number(image.width);
  const imageHeight = Number(image.height);
  return {
    topBorder: clarifaiFace.top_row * imageHeight,
    leftBorder: clarifaiFace.left_col * imageWidth,
    bottomBorder: imageHeight - (clarifaiFace.bottom_row * imageHeight),
    rightBorder: imageWidth - (clarifaiFace.right_col * imageWidth),
  }
}

faceBox = (box) => {
  this.setState({  box: box});
}

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonClick = (event) => {
    this.setState({imageUrl: this.state.input})
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.faceBox(this.calculateFacePosition(response)))
    .catch((err) => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignedIn: true})
    } else {
      this.setState({isSignedIn: false})
    }
    this.setState({route: route})
  }

  render() {
    const { isSignedIn, route, imageUrl, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={paramsOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>

        {route === 'SignIn' 
        ? <SignIn onRouteChange={this.onRouteChange}/>
        : (
            route === 'Register' 
            ? 
            <Register onRouteChange={this.onRouteChange}/>
            : 
            <>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
              <FaceRecognition imageUrl={imageUrl} box={box}/>
            </>
          )
        }
      </div>
    );
  }
}

export default App;
