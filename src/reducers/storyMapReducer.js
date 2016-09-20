import {ADD_MAP_MARKER} from '../constants/actionTypes';

import objectAssign from 'object-assign';
import initialState from './initialState';


export default function storyMapReducer(state = initialState.storyMap, action) {
  switch (action.type) {
    case ADD_MAP_MARKER:
      return objectAssign({}, state, {});


    default:
      return state;
  }
}
