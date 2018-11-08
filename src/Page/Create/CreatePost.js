import React, { Component } from 'react';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import './Create.css'
import axios from 'axios';
import { URL } from "../url.js";
import {renderQuill } from "../form_render";
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';


const Container = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin:5%;
`;

function validate(values){
    var errors = {};
    var hasErrors = false;
    if(!values.title || values.title.trim() === ''){
        errors.title = '게시물 제목을 입력하세요.';
        hasErrors = true;
    }

    if(!values.context || values.context.trim() === ''){
        errors.context = '게시물 내용을 입력하세요.';
        hasErrors = true;
    }
    return hasErrors && errors;
}

class CreatePost extends Component {

    constructor(props){
        super(props);
        this.state = { type : null, postId : 0 };
    }
    createPost(){
        var context= document.getElementsByTagName("input").context.value;    
            axios.post(`${URL}/create`,{
              "teamId" : this.state.teamId,
           "writer" : this.state.name,
               "context": context
            }).then();
          }

    render() {
        const { classes } = this.props;
        return (
        <Container>
    
          <div class="form">
          <form onSubmit={this.createPost.bind(this)}>
             <h3> 게시글 { this.state.postId === 0 ? '추가' : '수정'}</h3>
                 <p> 게시판에 글을 { this.state.postId === 0 ? '추가' : '수정'} 합니다.</p>
                 <Input name="title"  type="text"
                                label="게시물 제목" placeholder="게시물의 제목을 입력하세요." />

                    <div>
                    <TextField name="context"  component={renderQuill} size={400} />
                    </div>
            </form>
          </div>
    
        </Container>);
    }
}

export default (reduxForm({
    form : 'noticeForm',
    enableReinitialize : true,
    validate
})(CreatePost));