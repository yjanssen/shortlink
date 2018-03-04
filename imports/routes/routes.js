import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from '../ui/signup';
import Linka from '../ui/link';
import {Router, Route, Switch} from 'react-router';
import createHistory from "history/createBrowserHistory";
import NotFound from '../ui/notfound';
import Login from '../ui/login';
import {Link} from 'react-router-dom';

const history = createHistory();

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/link'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const isUnAuthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
  
    if (isUnAuthenticatedPage && isAuthenticated) {
      console.log('first');
      history.replace('/link');
    } else if (isAuthenticatedPage && !isAuthenticated) {
      console.log('second');
      history.replace('/');
    }
  
    console.log('isAuthenticated',isAuthenticated);
    console.log('isUnAuthenticatedPage',isUnAuthenticatedPage);
    console.log('isAuthenticatedPage',isAuthenticatedPage);
    console.log(history);
    console.log(pathname);
};

export const routes = (
  <Router history={history}>
    <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/signup" component={SignUp}/>
    <Route exact path="/link" component={Linka} />
    <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
