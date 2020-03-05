import React from 'react';
import {HashRouter, Route, Link} from 'react-router-dom'
import './style.scss';

import Calender from './components/Calender'
import Week from './components/Week'
import AddEvent from './components/AddEvent';
import Signup from './components/Signup';
import Login from './components/Login';
import withAuthentication from './HOC/withAuthentication'

function App() {
  return (
    <div className="App">
      <HashRouter >
        <Route path="/" exact component={withAuthentication(Calender)} />
        <Route path="/login" component={Login} />
        <Route path="/week" component={withAuthentication(Week)} />
        <Route path="/addevent" component={withAuthentication(AddEvent)} />
        <Route path="/signup" component={Signup} />
      </HashRouter>
    </div>
  );
}

export default App;
