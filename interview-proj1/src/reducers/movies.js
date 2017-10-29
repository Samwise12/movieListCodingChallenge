import { ADD_LIST, REMOVE_LIST, REMOVE_MOVIE, MOVIE_DELETE } from '../types';

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
		case REMOVE_LIST:
			return [];
		case REMOVE_MOVIE://HomePage
			return state.filter(item => item.id !== action.movieId);
		case MOVIE_DELETE:
			return [
			...state,
			action.movieId
			]

		default : return state;
	}
}


