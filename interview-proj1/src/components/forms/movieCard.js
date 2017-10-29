import React from 'react';
import filter from 'lodash/filter';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

export default function MovieCard({ movie, deleteMovie, removeItem, rateMovie, pRating }){
	let y = 'https://image.tmdb.org/t/p/w92', z, u;

	pRating = filter(pRating, o=>{return typeof o !== 'undefined'});//fixed undefined issue

	let q = filter(pRating, o => { return o.id === movie.id;})			
	 // console.log('pRating: ',pRating)
	 // console.log( filter(pRating, o => { return o.id === movie.id;}))
	if(typeof pRating === 'undefined'){
		pRating = '';
		z = '';
	} else if( 
	 filter(pRating, o => { return o.id === movie.id;}).length > 0		
		) {// console.log('q: ',q[0].rating)
	 z = (<strong>Personal Rating:</strong>);	
	}
	if (q.length > 0) {// console.log('q: ',q)
		u = q[0].rating;
	}
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
			<div className="header"><strong>Rating:</strong>{movie.vote_average} 
			&nbsp;
			{z}{u}
			</div>
			<div className="extra content">
				<div className="ui two buttons">
					<div className="ui basic button red" onClick={() => {deleteMovie(movie.id); removeItem(movie.id); } }>Delete</div>
					<div className="ui basic button green" onClick={() => {rateMovie(movie.poster_path, movie.id)} } >Rate Movie</div>
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

