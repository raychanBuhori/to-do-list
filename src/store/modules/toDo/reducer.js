import {
  GET_TODO_LIST,
  UPDATE_TODO_LIST,
  GET_TODO_DETAIL,
  SET_CURRENT_MENU
} from '../action-types';

const initialState = {
  list: [],
  detail: {},
  menu: 'all'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_LIST:
      return { ...state, list: action.payload }
    case UPDATE_TODO_LIST:
      return { ...state, list: action.payload }
    case GET_TODO_DETAIL:
      return { ...state, detail: action.payload }
    case SET_CURRENT_MENU:
      return { ...state, menu: action.payload }
    default:
      return state;
  }
}

export default reducer;