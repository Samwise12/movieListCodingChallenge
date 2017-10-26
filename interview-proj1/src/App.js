import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';

import HomeContainer from "./components/container/HomeContainer";
import MovieListPage from "./components/pages/MovieListPage";


const App = ({ location }) => (
  <div className="ui container">
  	<div className="ui two item menu">
<NavLink className="item" exact to="/">Search Movies</NavLink>
<NavLink className="item" exact to="/MovieListPage">Movie Lists</NavLink>
  	</div>
    <Route location={location} path="/" exact component={HomeContainer} />
    <Route location={location} path="/MovieListPage" exact component={MovieListPage} />
  </div>
  )

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
