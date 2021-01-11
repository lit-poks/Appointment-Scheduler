import { User } from "../user.model";

export interface State{
    user:User;
    authError: string;
    isLoading:boolean;
}

const initialState:State={
    user: null,
    authError: null,
    isLoading: false
}


export function authReducer(state=initialState,action){

    switch(action.type){
        default:
        return state;
    }
}