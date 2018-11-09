import axios from 'axios';
import queryString from "query-string";
import {URL} from '../Page/url';

export const Create_Post = 'Create_Post';

export function CreatePost(postModel){
    const request =
        axios({
            method : 'post',
            url : `${URL}/createApi.php`,
            data : postModel
        }) ;
    return {
        type : Create_Post,
        payload : request
    }
}