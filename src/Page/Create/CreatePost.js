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
import {Create_Post} from '../../action/action_Create';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Container = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin:5%;
`;

function validate(title,context,writer){
    var errors = {};
    var hasErrors = false;
    if(!title === ''){
        errors.title = '게시물 제목을 입력하세요.';
        hasErrors = true;
    }

    if(!context  === ''){
        errors.context = '게시물 내용을 입력하세요.';
        hasErrors = true;
    }
    if(!writer  === ''){
        errors.writer = '게시물 내용을 입력하세요.';
        hasErrors = true;
    }

    return hasErrors && errors;
}



class CreatePost extends Component {

    constructor(props){
        super(props);
        this.state = { postId : 0, writer: '', title: '', context:'' 
     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeContext = this.handleChangeContext.bind(this);
    }
    

    handleChange(event) {
 
        switch (event.target.name) {
            case 'writer':
                    this.setState({writer:event.target.value}) ;                
                break;
            case 'title':
                this.setState({title:event.target.value}) ;                
            break;
            default:
                break;
        }

    }
    handleChangeContext(event) {
        this.setState({context:event}) ; 
 
    }

     handleSubmit(event) {

        var errors = {};
        var hasErrors = false;
        if(this.state.title === ''){
            errors = '게시물 제목을 입력하세요.';
            hasErrors = true;
        }
    
        if(this.state.context  === ''){
            errors = '게시물 내용을 입력하세요.';
            hasErrors = true;
        }
        if(this.state.writer  === ''){
            errors = '작성자을 입력하세요.';
            hasErrors = true;
        }

        if(hasErrors===true){
            alert(errors);
            event.preventDefault();
        }
        else {
  
            const data = JSON.stringify({  
                "title" : this.state.title,
            "writer" : this.state.writer,
            "context": this.state.context});

            axios.post(`${URL}/CreatePostApi.php`,
               data
            ).then( response => {
                if(response.status===200){
                    alert("게시글이 추가되었습니다."); 
                    this.props.history.push('/')
                        
                }
                else{
                    alert("오류가 발생했습니다. 게시글 작성이 실패했습니다. 다시 시도해주세요.");       
                }
            });
            event.preventDefault();
        }


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
          
          <form onSubmit={this.handleSubmit}>
             <h3> 게시글 { this.state.postId === 0 ? '추가' : '수정'}</h3>
                 <p> 게시판에 글을 { this.state.postId === 0 ? '추가' : '수정'} 합니다.</p>
                 <div class ="writer">
                 <Input name="writer"  type="text"
                                label="작성자" placeholder="작성자를 입력하세요." onChange={this.handleChange}/>
                    </div>
                 <div class ="title">
                 <Input name="title"  type="text"
                                label="게시물 제목" placeholder="게시물의 제목을 입력하세요." fullWidth={true}  onChange={this.handleChange}/>
                    </div>
                    <div className="w3-container" style={{ width : window.innerWidth <= 420 ? '100%' : '80%' }}>
                     <ReactQuill name="context"  onChange={this.handleChangeContext} size={400}/>
                    </div>
                    <div class="create">
                     <Button variant="contained" type="submit" color="primary" >
                            <CheckIcon/> 게시물 {(this.state.postId === 0) ? "추가" : "수정"}하기
                </Button>
                </div>
            </form>
          </div>
        
        </Container>);
    }
}

export default CreatePost;