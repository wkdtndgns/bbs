import React, { Component } from 'react';
import Appbar from './Appbar';
import Table from './table';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin:5%;
`;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { list: [],};

  }

  render() {

    return (
   
      <Container>
      <Appbar/>
        <Table data={this.state.list} />
      </Container>
     );
  }
}

export default App;
