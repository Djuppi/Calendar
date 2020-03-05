import React from 'react';
import {HashRouter, Route, Link} from 'react-router-dom'
import './style.scss';

import Calender from './components/Calender'
import Week from './components/Week'
import AddEvent from './components/AddEvent';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <HashRouter >
        <Route path="/" exact component={Calender} />
        <Route path="/login" component={Login} />
        <Route path="/week" component={Week} />
        <Route path="/addevent" component={AddEvent} />
        <Route path="/signup" component={Signup} />
      </HashRouter>
    </div>
  );
}

export default App;
