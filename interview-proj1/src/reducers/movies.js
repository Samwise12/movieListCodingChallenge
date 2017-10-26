import { ADD_LIST } from '../types';

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
		default : return state;
	}
}


