import React from 'react';
// import { Link } from 'react-router-dom';

export default function MovieCard({movie}){
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
			<div className="extra content">
				<div className="ui two buttons">
					{/*<Link to={`/movie/${movie._id}`} className="ui basic button green">Edit</Link>*/}
					{/*<div className="ui basic button red" onClick={() => deleteMovie(movie._id)}>Delete</div>*/}
				</div>
			</div>
		</div>
		);
}

// MovieCard.propTypes = {
	// movie: React.PropTypes.object.isRequired//,
	// deleteGame: React.PropTypes.func.isRequired
// }

