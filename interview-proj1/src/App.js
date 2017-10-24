import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';

import HomePage from "./components/pages/HomePage";
import MovieListPage from "./components/pages/MovieListPage";


const App = ({ location }) => (
  <div className="ui container">
  	<div className="ui two item menu">
<NavLink className="item" exact to="/">Search Movies</NavLink>
<NavLink className="item" exact to="/MovieListPage">Movie Lists</NavLink>
  	</div>
    <Route location={location} path="/" exact component={HomePage} />
    <Route location={location} path="/MovieListPage" exact component={MovieListPage} />
  </div>
  )

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
