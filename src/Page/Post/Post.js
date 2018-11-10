import React, { Component } from 'react';
import styled from 'styled-components';
import PlusIcon from '@material-ui/icons/PlusOne';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';
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
    const { indexed, classes } = this.props;
    return (

      <Container>
            <div class="back">
            <Link to={`/`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" type="button" color="defalut">
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
