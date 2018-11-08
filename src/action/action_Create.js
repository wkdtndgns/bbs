import axios from 'axios';
import queryString from "query-string";
import {URL} from '../Page/url';

export const Create_Post = 'Create_Post';

export function CreatePost(postForm, postId,writer){
    const request = postId === 0 ?
        axios({
            method : 'post',
            url : `${URL}/post/${writer}`,
            data : postForm
        }) : axios({
            method : 'put',
            url : `${URL}/post/${postId}`,
            data : postForm
        });
    return {
        type : Create_Post,
        payload : request
    }
}