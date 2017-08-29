import React, { Component } from 'react';
import Footer from './Footer';
import '../scss/main.scss';

class App extends Component {

  render(){
    return(
      <div className='content'>
        <div>
            {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App
