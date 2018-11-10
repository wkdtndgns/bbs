import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Page/Home/Home';
import CreatePost from './Page/Create/CreatePost';
import Post from './Page/Post/Post';

export default class App extends Component {

  render() {
    return (
      <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={CreatePost} />
        <Route exact path="/post" component={Post} />      
       </div>
  </Router>
     );
  }
}
