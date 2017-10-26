import { ADD_LIST, MOVIE_DELETE } from '../types';

// const initialState = {
// 	lists: {}
// };

export default (state=[],action={}) => {
	switch(action.type) {
		case ADD_LIST:
			return [
				...state,
				 action.list
			];
		case MOVIE_DELETE:
			return [
			...state,
			action.movieId
			]

		default : return state;
	}
}


