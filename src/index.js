import React from 'react';
import { AppRegistry } from 'react-native';
import Main from './controllers/Main';

// process.env.NODE_ENV = 'production';


// register the app
AppRegistry.registerComponent('App', () => Main);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root')
});