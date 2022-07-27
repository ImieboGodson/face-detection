import React, { Component } from 'react';
import env from 'react-dotenv';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const paramsOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 3000
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
      faceBox: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      },
    }
  }

  onRouteChange = (currentRoute) => {
    this.setState({route: currentRoute});
    (currentRoute === 'home') ? this.setState({isSignedIn: true}) : this.setState({isSignedIn: false})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    });
    console.log('User Data', this.state.user);
    console.log(env.API_KEY);
  }

  onSignOut = () => {
    this.setState(Object.assign(this.state, 
      {
        input: '',
        imageUrl: '',
        faceBox: {},
        route: 'SignIn',
        isSignedIn: false,
        user: {
              id: '',
              name: '',
              email: '',
              entries: 0,
              joined: '',
          }
      }));
    console.log('Signing out', this.state);
  }

  calculateFaceDetectionBox = (data) => {
    const faceRegionData = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputImage');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    console.log(imageWidth, imageHeight);
    console.log(faceRegionData);

    return {
      topBorder: faceRegionData.top_row * imageHeight,
      rightBorder: imageWidth - (faceRegionData.right_col * imageWidth),
      bottomBorder: imageHeight - (faceRegionData.bottom_row * imageHeight),
      leftBorder: faceRegionData.left_col * imageWidth,
    }

  }

  faceBoxBorders = (box) => {
    console.log(box);
    this.setState({faceBox: box});
  }

  addToEntries = () => {
    fetch('http://localhost:8000/image', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user, { entries : count }))
      console.log(this.state.user.entries);
    })
    .catch(err => {
      console.log(err);
    })
  }

  onButtonSubmit = (event) => {
    this.setState({imageUrl: this.state.input});

     fetch('http://localhost:8000/image_data', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(data => {
          return data.json();
      })
        .then(response => {
          if(response) {
            console.log(response);
            this.addToEntries()
            this.faceBoxBorders(this.calculateFaceDetectionBox(response))
          }
      })
      .catch(err => console.log(err));
   }

  render() {

    const { isSignedIn, faceBox, imageUrl } = this.state;

    return (
      <div className="App">
        <Particles className='particles'
          params={paramsOptions}
        />
        <Navigation onSignOut={this.onSignOut} isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        <Logo />
        {
          (this.state.route === 'home')
          ?
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition faceBox={faceBox} imageUrl={imageUrl}/>
          </div>
          :
          (
            (this.state.route === 'SignIn')
            ?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
        
      </div>
    );
  }
}

export default App;
