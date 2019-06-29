import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
      return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onRouteChange ('signout')} className='b ph3 pv2 ba b--black bg-transparent pointer f6 dib'> Sign Out </p>
    </nav>
      );
    } else {
      return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onRouteChange ('signin')} className='b ph3 pv2 ba b--black bg-transparent pointer f6 dib'> Sign In </p>
      <p onClick={() => onRouteChange ('register')} className='b ph3 pv2 ba b--black bg-transparent pointer f6 dib'> Register </p>
    </nav>
      )
    }
}



export default Navigation