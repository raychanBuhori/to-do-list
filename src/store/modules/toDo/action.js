import {
  GET_TODO_LIST,
  UPDATE_TODO_LIST,
  GET_TODO_DETAIL,
  SET_CURRENT_MENU,
  FAILED
} from '../action-types';

import { getToDoList } from 'services/toDo';

export const _getInitialToDoList = () => async dispatch => {
  await getToDoList()
    .then(res => {
      console.log(res);
      dispatch({ type: GET_TODO_LIST, payload: res });
    }).catch(err => {
      console.log(err);
      dispatch({ type: FAILED });
    })
}

export const _updateMenu = key => async dispatch => {
  dispatch({ type: SET_CURRENT_MENU, payload: key });
}

export const _updateList = list => async dispatch => {
  console.log(list);
  dispatch({ type: UPDATE_TODO_LIST, payload: list });
}

export const _setDetail = detail => async dispatch => {
  dispatch({ type: GET_TODO_DETAIL, payload: detail });
}

