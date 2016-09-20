import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import StoryMapContainer from './containers/StoryMapContainer'; // eslint-disable-line import/no-named-as-default
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={StoryMapContainer}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
