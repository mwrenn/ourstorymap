import { combineReducers } from 'redux';
import storyMap from './storyMapReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  storyMap,
  routing: routerReducer
});

export default rootReducer;
