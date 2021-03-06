import React, { Component } from 'react';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import './Create.css'
import axios from 'axios';
import { URL } from "../url.js";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import queryString from 'query-string';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin:5%;
`;

class CreatePost extends Component {

    constructor(props){
        super(props);
        this.state = { postId : 0, writer: '', title: '', context:'' 
     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeContext = this.handleChangeContext.bind(this);
    }
    
    componentDidMount() {
        const {id} = queryString.parse(this.props.location.search);  
       
        if(id==null){
        }
        else{
            this.setState({postId:id});

            const postId = JSON.stringify({  
                "id":id});

              axios.post(`${URL}/Post/FindIdPostApi.php`,
                  postId
                ).then( response => {
                  if(response.status===200){                        
                        
                    if(response.data.status===204){
                        alert("오류가 발생했습니다. 게시글 수정이 실패했습니다. 다시 시도해주세요."); 
                        this.props.history.push('/'); 
                    }
                    else{
                    const data =response.data;
                      this.setState({
                          title : data[0].title, 
                          context : data[0].context, 
                          writer : data[0].writer                                 
                        })}
                }
                else{
                    alert("오류가 발생했습니다. 게시글 수정이 실패했습니다. 다시 시도해주세요.");   
                    this.props.history.push('/');    
                }
                });

        };  

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
        if(this.state.title.length>50){
            errors = '게시물 제목은 50글자 초과하면 안됩니다.';
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
        if(this.state.writer.length>25){
            errors = '작성자는 25글자 초과하면 안됩니다.';
            hasErrors = true;
        }

        if(hasErrors===true){
            alert(errors);
            event.preventDefault();
        }
        else {

            let data = JSON.stringify({  
                "id" : this.state.postId,
                "title" : this.state.title,
            "writer" : this.state.writer,
            "context": this.state.context});

            if(this.state.postId===0){
                axios.post(`${URL}/Post/CreatePostApi.php`,
                data
                ).then( response => {
                    let regx =/(Connection failed).*/;
                    var connection =regx.test(response.data);
                    if(connection){
                        alert("서버 오류 관리자에게 문의해주세요.");
                    }

                    else{
                        if(response.data.status===200){
                            alert("게시글이 추가되었습니다.");                        
                            this.props.history.push('/');
                        }
                        else{
                            alert("오류가 발생했습니다. 게시글 작성이 실패했습니다. 다시 시도해주세요.");       
                        }
                    }
                });
                event.preventDefault();
            }
            
            else{
                axios.post(`${URL}/Post/UpdatePostApi.php`,
                data
                ).then( response => {
                    if(response.data.status===200){
                        alert("게시글이 업데이트되었습니다."); 
                        this.props.history.push('/');                        
                    }
                    else{
                        alert("오류가 발생했습니다. 게시글 업데이트가 실패했습니다. 다시 시도해주세요.");       
                    }
                });
                event.preventDefault();}
            
        }
    }

    render() {
        const { classes } = this.props;

        return (
        <Container>
            <div className="back">
            <Link to={`/`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" type="button" color="default">
                        뒤로가기
                </Button>
            </Link>
            </div>
          <div className="form">
          
          <form onSubmit={this.handleSubmit}>
             <h3> 게시글 { this.state.postId === 0 ? '추가' : '수정'}</h3>
                 <p> 게시판에 글을 { this.state.postId === 0 ? '추가' : '수정'} 합니다.</p>
                 <div className ="writer">
                 <Input name="writer"  type="text"
                                label="작성자" placeholder="작성자를 입력하세요." value={this.state.writer} onChange={this.handleChange}/>
                    </div>
                 <div className ="title">
                 <Input name="title"  type="text"
                                label="게시물 제목" placeholder="게시물의 제목을 입력하세요."  value={this.state.title} fullWidth={true}  onChange={this.handleChange}/>
                    </div>
                    <div className="w3-container" style={{ width : window.innerWidth <= 420 ? '100%' : '80%' }}>
                     <ReactQuill name="context"  value={this.state.context} onChange={this.handleChangeContext} size={400}/>
                    </div>
                    <div className="create">
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