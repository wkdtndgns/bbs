import { createHashHistory } from 'history'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './table.css';
import React, { Component } from 'react';
import axios from 'axios';
import { URL } from "../../url.js";
import {  Router, Route } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class SimpleTable extends Component {
  constructor(props){
    super(props);
    this.state = { data : props.data };
    
  }
  
  componentDidMount() {
    axios.get(`${URL}/SelectAllPostApi.php`).then(
      r => { this.setState({ data : r.data });

    }   
    )
  }


  render() {
    const { classes, indexed } = this.props;
    
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
        <TableRow>
            <TableCell >제목</TableCell>
            <TableCell numeric>작성자</TableCell>
              <TableCell numeric>날짜</TableCell>

              <TableCell numeric>조회수</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {this.state.data.map(row => {
            return (
          
              <TableRow key={row.id} id={row.id} onClick={()=>{this.props.props.history.push(`/post?id=${row.id}`)}}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell numeric>{row.writer}</TableCell>
                <TableCell numeric>{row.writtenDate}</TableCell>
                <TableCell numeric>{row.views}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);