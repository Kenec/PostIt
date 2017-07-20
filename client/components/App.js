import React, { Component } from 'react';

class App extends Component {

  render(){
    const age = 8;
    let message = age < 8 ? <h2>You can Order only soft drinks</h2> : <h2>You can order Beer</h2>;

    return message
  }
}

export default App
