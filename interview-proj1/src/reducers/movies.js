import { ADD_Movie } from '../types';

export default function movies(state=[],action={}) {
	switch(action.type) {
		case ADD_Movie:
			return [
				...state,
				 action.game
			];
		default : return state;
	}
}


