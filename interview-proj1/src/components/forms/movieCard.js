import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

export default function MovieCard({ movie, deleteMovie, removeItem, rateMovie }){
	let y = 'https://image.tmdb.org/t/p/w92'
	// {y+`${cache.results[i].poster_path}`
	return (
		<div className="ui card" >
			<div className="ui small image">
				<img id='expand' src={y + movie.poster_path} alt="Movie Cover"/>
			</div>
			<div className="content">
			<div className="header">{movie.title}</div>
			<div className="header">{movie.release_date}</div>
			</div>
			<div className="description"><i>{movie.overview}</i></div>
			<div className="header"><strong>Rating: </strong>{movie.vote_average}</div>
			<div className="extra content">
				<div className="ui two buttons">
					<div className="ui basic button red" onClick={() => {deleteMovie(movie.id); removeItem(movie.id); } }>Delete</div>
					<div className="ui basic button green" onClick={() => {rateMovie(movie.id)} } >Rate Movie</div>
				</div>
			</div>
		</div>
		);
}

// MovieCard.propTypes = {
// 	movie: React.PropTypes.object.isRequired,
// 	deleteMovie: React.PropTypes.func.isRequired
//  rateMovie: React.PropTypes.func.isRequired
// }

