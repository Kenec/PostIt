// import
import React from 'react';
import Footer from './Footer';
import '../scss/main.scss';

/**
 * @function App 
 * @param {*} props
 * @return {DOM} DOM element 
 */
function App({ children }) {
  return (
    <div className="content">
      <div>
        { children }
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default App;
