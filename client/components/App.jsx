// import
import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import '../scss/main.scss';

/**
 * Parent Component
 * @function App
 * @param {any} props
 * @return {DOM} DOM element
 */
const App = ({ children }) => (
  <div className="content">
    <div>
      { children }
    </div>
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
