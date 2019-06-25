import React from 'react';
// eslint-disable-next-line
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import User from './components/User/User';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: '#3CA9D1',
        blur: 5
      }
    }
  }
}

function App() {
  return (
    <div className="App">
    <Particles 
      params = {particlesOptions}
    />
      <Navigation />
      <Logo />
      <User />
      <ImageLinkForm />
      {/*<FaceRecognition />*/}

    </div>
  );
}

export default App;
