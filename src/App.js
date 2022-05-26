import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { history } from './history';
import './styles/index.scss';

import ToDo from 'pages/ToDo';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={ToDo} />
      </Switch>
    </Router>
  );
}

export default App;
