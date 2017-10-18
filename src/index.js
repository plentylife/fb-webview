import React from 'react';
import {AppRegistry} from 'react-native';
import Main from './controllers/Main';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from "redux/reducers"

// process.env.NODE_ENV = 'production';

const store = createStore(reducer, {newOffer: {description: "doordash food delivery backpack in good condition. Two compartments, lined with foil on the inside, surprisingly light, side pockets. Size 1x2x3 feet."}});

function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  )
}

// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root')
});