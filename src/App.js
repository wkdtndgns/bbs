import React, { Component } from 'react';
import {AppContainer} from "./container";
import {reducer} from './reducer';
import {Provider} from 'react-redux';
import {createStore } from 'redux';
const store = createStore(reducer);

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
     );
  }
}
