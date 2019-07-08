import React, { Component } from 'react';
// eslint-disable-next-line
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import User from './components/User/User';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';


/* Particles settings for background */

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 600
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: '#3CA9D1',
        blur: 5
      }
    }
  }
}

/* Particles settings ends */

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: '',
  }
 }

class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined,

    }})
  }

  calculateFaceLocations = (data) => {
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById ('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      console.log (width, height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
      }
    });
  }; 

  displayBoundingBoxes = (boxes) => {
    console.log (boxes);
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState ({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState ({imageUrl: this.state.input});
      fetch ('https://face-recognition-project-api.herokuapp.com/imageurl', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                input: this.state.input
              })
      })
    .then(response => response.json())
    .then(response => this.displayBoundingBoxes(this.calculateFaceLocations(response)))
    .catch (err => console.log (err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render () {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
      <Particles className='particles' 
        params = {particlesOptions}
      />
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange} />
        {route === 'home' 
          ? <div>
              <Logo />
              <User 
                name = {this.state.user.name}
              />
              <ImageLinkForm 
              onInputChange = {this.onInputChange} 
              onButtonSubmit = {this.onButtonSubmit}/>
              <FaceRecognition boxes={boxes} imageUrl = {imageUrl} />
            </div>
          : ( 
            route === 'signin' 
            ? <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
