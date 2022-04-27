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
// import SignIn from './components/SignIn/SignIn';
// import Register from './components/Register/Register';


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
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = (event) => {
    this.setState({imageUrl: this.state.input})

     app.models.predict (
        Clarifai.FACE_DETECT_MODEL,
        this.state.input,
        )
      .then(
        response => console.log(response)
        )
      .catch(err => console.log(err));
     }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={paramsOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
