import React, {Component} from 'react';
import {Route, Router} from 'react-router-dom';
import classNames from 'classnames';
import Home from '../Page/Home/Home';
import CreatePost from '../Page/Create/CreatePost';

class AppRouter extends Component{
    render() {
        return (
         
            <Router>
            <Route exact path="/" component={Home} />
           <Route exact path="/create" component={CreatePost} />
            </Router>
       
         );
      }
}


export default AppRouter;