import React, { Component } from 'react';
import Appbar from './Appbar';
import Table from './Table/table';
import styled from 'styled-components';
import PlusIcon from '@material-ui/icons/PlusOne';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './home.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin:5%;
`;

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { list: [],};

  }

  render() {
    const { indexed, classes } = this.props;
    return (

      <Container>
      <Appbar/>
      <div className="w3-bar-item">
             <Link to={`/Create`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" type="button" color="secondary">
                       <PlusIcon /> 게시글 추가
                  </Button>
               </Link>


        </div> 
        <Table data={this.state.list} />
      </Container>

     );
  }
}

export default Home;
