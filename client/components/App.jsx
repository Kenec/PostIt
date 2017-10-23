// import
import React from 'react';
import PropTypes from 'prop-types';
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
  children: PropTypes.node.isRequired,
};

export default App;
