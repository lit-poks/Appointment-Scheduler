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
        case AuthActions.LOGIN_START:
            return{
                ...state,
                authError:null,
                isLoading:true
            }
        case AuthActions.LOGIN_SUCCESS:
            const user=new User(action.payload.email,action.payload.userId,action.payload.token,action.payload.expirationDate);
            return{
                ...state,
                authError:null,
                user:user,
                isLoading:null
            }
        case AuthActions.AUTHENTICATION_FAIL:;
            return{
                ...state,
                authError: action.payload,
                user:null,
                isLoading:null
            }
        case AuthActions.LOGOUT:
            return{
                ...state,
                authError:null,
                user:null
            }

            case AuthActions.CLEAR_ERROR:
            return{
                ...state,
                authError: null
            }
        default:
        return state;
    }
}