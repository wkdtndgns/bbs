import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import queryString from 'query-string';
import {withRouter, Link} from 'react-router-dom';
import {URL} from '../../url'
import axios from 'axios';
import './card.css'
import RemoveIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BackIcon from '@material-ui/icons/ArrowBack';
import Review from '../Review/Review';

const styles = theme => ({
  card: {
    maxWidth: 700,
  },

  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {

  state = { expanded: false };
  constructor(props){
    super(props);
    this.state = {  id:"0",title: "제목",context: "내용", writer: "작성자", views: "조회수", writtenDate: "작성일" ,
        reviewList:[],
      };
  }
    
  componentDidMount() {
    const {id} = queryString.parse(this.props.props.location.search);

    const postId = JSON.stringify({  
      "id":id});
    this.setState({id:id});

    axios.post(`${URL}/Post/FindIdPostApi.php`,
        postId
      ).then( response => {
        if(response.status===200){
           const data =response.data;
          
           if(response.data.status===204){
            alert("오류가 발생했습니다. 게시글 불러오기 실패했습니다. 다시 시도해주세요.");    
            this.props.props.history.push('/');
           }
           else{
           this.setState({
                title : data[0].title, 
                context : data[0].context, 
                writer : data[0].writer,
                views : data[0].views,
                writtenDate : data[0].writtenDate                
              });

              axios.post(`${URL}/Review/FindPostIdReviewApi.php`,
              postId
              ).then( response => {
                if(response.status===200){
                  const data =response.data;     
                  if(response.data.status===204){
                    document.querySelector(".review").innerHTML="답변이 없습니다.";
                   }
          
                else{
                 this.setState({
                        reviewList:data           
                  })
                }
                 this.handleExpandClick();    
            
              }
              else{
                  alert("오류가 발생했습니다. 답변 불러오기 실패했습니다. 다시 시도해주세요."); 
                  this.props.props.history.push('/');
              }
              });
            }
      }
      else{
          alert("오류가 발생했습니다. 게시글 불러오기 실패했습니다. 다시 시도해주세요.");    
          this.props.props.history.push('/');
      }
      });

     
  }
  handleExpandClick = () => {
    if(!(this.state.reviewList.length===0)){
      if(this.state.expanded){
        document.querySelector(".review").innerHTML="답변 보기";
      }
      else{
        document.querySelector(".review").innerHTML="답변 숨기기";
      }
    }

    this.setState(state => ({ expanded: !state.expanded }));

  };

  handleClickDelete(){
    const isDelete = window.confirm("선택하신 게시글을 삭제합니다. 계속 진행 하시겠습니까?");
    const postId = JSON.stringify({  
      "id":this.state.id});

    if(isDelete){
        axios.post(`${URL}/Post/DeletePostApi.php`,
        postId
      ).then( response => {
        if(response.status===200){
            if(response.data.status===200){
              alert("게시글이 삭제되었습니다."); 
              this.props.props.history.push('/');             
            }
          else{
            alert("오류가 발생했습니다. 게시글 작성이 실패했습니다. 다시 시도해주세요.");       
          }              
        }
        else{
            alert("오류가 발생했습니다. 게시글 작성이 실패했습니다. 다시 시도해주세요.");       
        }
    });
    }
};

handleClickReviewDelete(id){
  const isDelete = window.confirm("선택하신 댓글을 삭제합니다. 계속 진행 하시겠습니까?");
  const reviewId = JSON.stringify({  
    "id":id});

  if(isDelete){
      axios.post(`${URL}/Review/DeleteReviewApi.php`,
      reviewId
    ).then( response => {
      if(response.status===200){
        if(response.data.status===200){
          alert("댓글이 삭제되었습니다."); 
          window.location.reload(true);}
          else{
            alert("오류가 발생했습니다. 댓글 삭제가 실패했습니다. 다시 시도해주세요.");  
          }         
      }
      else{
          alert("오류가 발생했습니다. 댓글 삭제가 실패했습니다. 다시 시도해주세요.");       
      }
  });
  }
};

  render() {
    const { classes } = this.props;
    const { writtenDate, views,  writer, context, id } = this.state;
    return (
      <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              cafe
            </Avatar>
          }
          action={
            <IconButton>
                 <img src="https://img.cafe24.com/img/simplexi/common/h3_logobottom_m.png"/>
            </IconButton>
          }
          title={this.state.title}
          subheader={new Date(writtenDate).toLocaleDateString() + new Date(writtenDate).toLocaleTimeString() + " / 작성자 : " + writer}
         />
 
       <CardContent className="cardContent">
          <div
              dangerouslySetInnerHTML={ {__html: (this.state.context === null || this.state.context) } }
              style={{ minHeight : '300px' }}
          />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
        <IconButton aria-label="이전으로 이동 ">
            <Link to={`/`}>
              <BackIcon />
            </Link>
          </IconButton>
          {
              <Link to={`/Create?id=${this.state.id}`}>
                <IconButton aria-label="게시물을 수정합니다.">
                  <EditIcon />
                </IconButton>
              </Link> 
          }
          {
              <div onClick={() => this.handleClickDelete()}>
                <IconButton aria-label="게시물을 삭제합니다.">
                  <RemoveIcon />
                </IconButton>
              </div> 
          }
       <p className="review"> 답변 보기</p>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"            
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" >
        
            {this.state.reviewList.map(row => {
            return (
         
              <CardContent key={row.id}>
              <Typography paragraph>답변:       
              </Typography>
              <Typography paragraph>
                  {row.context}
                  <span className="reviewDelete" onClick={() => this.handleClickReviewDelete(row.id)}>
                  답변 삭제
                  <IconButton aria-label="게시물을 삭제합니다.">
                   <RemoveIcon />
                  </IconButton>
                </span> 
              </Typography>      
              <hr/>             
            </CardContent>
            
            );
          })}

        </Collapse>
      </Card>
      <Review props={this.props}/>

      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);