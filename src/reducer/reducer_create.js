import * as types from '../action/action_Create';

const initialState ={
    type: '',
}

export default function create(state=initialState, action){
    switch(action.type){
        case types.Create_Post:
            return {  type : 'Success' };
        default :
            return {state}; 
    }

}