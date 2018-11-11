import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {URL} from '../../url'


const Post = styled.div`
    padding: 3em 1em;
`;


class PaperSheet extends Component{
    constructor(props){
        super(props);
        this.state = { data:[], id: "0",
        };
      }


componentDidMount(){
    const {id} = queryString.parse(this.props.props.props.location.search);
    this.setState({id:id});
}



createMemo(){
    var context= document.getElementsByTagName("input").context.value;    
    const data = JSON.stringify({  
    "id": this.state.id,
    "context":context
    });
    axios.post(`${URL}/Review/CreateReviewApi.php`,data
    ).then(response => {
        if(response.status===200){
            alert("답변 작성에 성공했습니다.");     
            window.location.reload(true);
      }
      else{
          alert("오류가 발생했습니다. 답변 작성에 실패했습니다. 다시 시도해주세요.");          
        }
      });


}

render(){

  return(
    <div>
        <Post>
          
        <Grid container spacing={24}>
        <Grid item xs={12} sm={10}>
                <TextField
                    required
                    id="context"
                    name="context"
                    label="답변을 적으세요"
                    fullWidth
                    autoComplete="내용"
                />
            
                </Grid>
            <Button variant="contained" color="primary"onClick={this.createMemo.bind(this)}>
            send
            </Button>
            </Grid>
           
        </Post>
    </div>
  );}

}

export default PaperSheet;