/* @flow */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StackNavigator } from 'react-navigation';
import thunk from 'redux-thunk';
import type { Store } from 'redux';

import reducers from './reducers';
import BrowserScreen from './components/BrowserScreen';
import MoviePreviewScreen from './components/MoviePreviewScreen';
import MovieScreen from './components/MovieScreen';
import type { Action } from './actions/types';

const initialState = {};
const MovieStreamer = StackNavigator({
  Browser: {
    screen: BrowserScreen,
    navigationOptions: () => ({
      header: false,
    }),
  },
  MoviePreview: {
    screen: MoviePreviewScreen,
    navigationOptions: () => ({
      header: false,
    }),
  },
  Movie: {
    screen: MovieScreen,
    navigationOptions: () => ({
      header: false,
    }),
  },
});

class App extends React.Component<{}> {
  store: Store<Object, Action>;

  constructor() {
    super();

    this.store = createStore(
      reducers,
      initialState,
      applyMiddleware(thunk),
    );
  }

  render() {
    return (
      <Provider store={this.store}>
        <MovieStreamer />
      </Provider>
    );
  }
}

export default App;
