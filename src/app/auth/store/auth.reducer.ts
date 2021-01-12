import { User } from "../user.model";
import * as AuthActions from './auth.actions';

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


export function authReducer(state=initialState,action:AuthActions.AuthActions){

    switch(action.type){
        case AuthActions.REGISTRATION_START:
            return{
                ...state,
                authError:null,
                isLoading: true
            }
        case AuthActions.REGISTRATION_SUCCESS:
            return{
                ...state,
                authError:null,
                isLoading:false
            }
        default:
        return state;
    }
}