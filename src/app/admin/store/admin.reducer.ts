import { RegistrationRequest } from "../registration-request.model";
import { Rooms } from "../rooms.model";
import * as AdminActions from "./admin.actions";


export interface State{
    rooms: Rooms[];
    register: RegistrationRequest[],
    alertMessage: string
}

const initialState:State={
    rooms:[
        new Rooms(1,'Meeting Hall'),
        new Rooms(2,'Canteen')
    ],
    register: [
    ],
    alertMessage:''
}

export function adminReducer(state=initialState,action: AdminActions.AdminActions){
    switch(action.type){
        case AdminActions.ADD_ROOMS:
            return{
                ...state,
                rooms:[...state.rooms,action.payload]
            }
        
            case AdminActions.SET_REGISTRATION:
                return{
                    ...state,
                    register: [...action.payload]
                }

            case AdminActions.SET_ROOMS:
                return{
                    ...state,
                    rooms: [...action.payload]
                }
            case AdminActions.PROCESSS_REGISTRATION:
                return{
                    ...state,
                    register: state.register.filter((user,index)=>{
                        return index!=action.payload
                    })
                }


        default:
            return state;
    }
}