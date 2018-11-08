import React, { Component } from 'react';
import {appContainer} from "./container/appContainer";
import reducer from './reducer';
import {Provider} from 'react-redux';
import {createStore } from 'redux';
const store = createStore(reducer);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <appContainer/>
      </Provider>
     );
  }
}

export default App;
