import axios from 'axios';

export const ADD_LIST = 'ADD_LIST';
export const MOVIE_DELETE = 'MOVIE_DELETE';

export function addList(list) {
	return {
		type: ADD_LIST,
		list
	}
}

export function movieDeleted(movieId) {
	return {
		type: MOVIE_DELETE,
		movieId
	}
}

export function deleteMovie(movieId) {
	return  dispatch => {
		return axios.delete('/api/lists', { data : {movieId: movieId} })
		.then((response) => {//console.log(movieId)
								return dispatch(movieDeleted(movieId));
							})
		.catch( err => console.log(err))		
			
	}
}



