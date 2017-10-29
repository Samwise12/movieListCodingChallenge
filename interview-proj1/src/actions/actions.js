import axios from 'axios';

export const ADD_LIST = 'ADD_LIST';
export const MOVIE_DELETE = 'MOVIE_DELETE';
export const REMOVE_LIST = 'REMOVE_LIST';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';

export function removeList(list) {
	return {
		type: REMOVE_LIST
	}
}

export function removeMovie(movieId) {//used in HomePage
	return {
		type: REMOVE_MOVIE,
		movieId
	}
}

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



