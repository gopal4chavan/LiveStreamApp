import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';

import Header from './Header';
import StreamCreate from './stream/StreamCreate';
import StreamDelete from './stream/StreamDelete';
import StreamEdit from './stream/StreamEdit';
import StreamList from './stream/StreamList';
import StreamShow from './stream/StreamShow';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path='/' exact component={StreamList} />
            <Route path='/streams/new' component={StreamCreate} />
            <Route path='/streams/edit/:id' component={StreamEdit} />
            <Route path='/streams/delete/:id' component={StreamDelete} />
            <Route path='/streams/:id' component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;