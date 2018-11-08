import React, { Component } from 'react';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import './Create.css'
import axios from 'axios';
import { URL } from "../url.js";
import {renderQuill } from "../form_render";
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';

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
            <div class="back">
            <Link to={`/`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" type="button" color="defalut">
                        뒤로가기
                </Button>
            </Link>
            </div>
          <div class="form">
          
          <form onSubmit={this.createPost.bind(this)}>
             <h3> 게시글 { this.state.postId === 0 ? '추가' : '수정'}</h3>
                 <p> 게시판에 글을 { this.state.postId === 0 ? '추가' : '수정'} 합니다.</p>
                 <div class ="writer">
                 <Input name="writer"  type="text"
                                label="작성자" placeholder="작성자를 입력하세요." />
                    </div>
                 <div class ="title">
                 <Input name="title"  type="text"
                                label="게시물 제목" placeholder="게시물의 제목을 입력하세요." fullWidth={true}/>
                    </div>
                     <div>
                    <TextField name="context"  component={renderQuill} size={400} />
                    </div>
                    <div class="create">
                     <Button variant="contained" type="submit" color="primary">
                            <CheckIcon/> 게시물 {(this.state.postId === 0) ? "추가" : "수정"}하기
                </Button>
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