import { combineReducers } from 'redux';

import toDoReducer from './toDo/reducer';

const reducer = combineReducers({
	toDo: toDoReducer
});

export default reducer;
