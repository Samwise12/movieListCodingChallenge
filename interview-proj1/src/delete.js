import React from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

export default function MoviesList({ movies }) {
	const emptyMessage = (
		<p>There are no lists in your collection</p>
		)
	const moviesList = (
		<p>movies list</p>
		)
	return (
		<div>
		{movies.length === 0 ? emptyMessage : moviesList}
		</div>
		)	
}	

MoviesList.propTypes = {
	movies: PropTypes.array.isRequired
}
