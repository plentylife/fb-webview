import React, {Component} from 'react';
import {Redirect, Route, BrowserRouter as Router} from 'react-router-dom'
import FallbackPage from '../pages/FallbackPage'
import NewDonationPage from '../pages/NewDonationPage'

class App extends Component {

  componentWillMount() {
    window.extAsyncInit = () => {
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Redirect to="/" />
          <Route exact path="/" component={FallbackPage}/>
          <Route exact path="/donation" component={NewDonationPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
