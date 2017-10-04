import React from 'react';
//import ReactDOM from 'react-dom';
import { AppRegistry } from 'react-native';
import Main from './controllers/Main';
// import registerServiceWorker from './registerServiceWorker';


//ReactDOM.render(<Main/>, document.getElementById('root'));
// registerServiceWorker();


// register the app
AppRegistry.registerComponent('App', () => Main);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root')
});