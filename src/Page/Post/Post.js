import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Card from './Card/Card.js'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin:5%;
`;

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = { list: [],};

  }

  render() {

    return (

      <Container>
            <div className="back">
            <Link to={`/`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" type="button" color="default">
                        뒤로가기
                </Button>
            </Link>
            </div>
          <Card props={this.props}/>
       
      </Container>

     );
  }
}

export default Post;
