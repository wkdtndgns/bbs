import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../Page/Home/Home';
import CreatePost from '../Page/Create/CreatePost';



class AppRouter extends Component{
    render() {
        return (        
            <Router>
                <div>
                <Route exact path="/" component={Home} />
                 <Route exact path="/create" component={CreatePost} />
                 </div>
            </Router>
       
         );
      }
}


export default AppRouter;