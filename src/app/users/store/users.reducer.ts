import { Rooms } from "src/app/admin/rooms.model";
import { Appointments } from "../appointments.model";
import * as UsersActions from '../store/users.action';

export interface State{
    appointments: Appointments[],
    isLoading:boolean
}

const initialState:State={
    appointments:[
    ],
    isLoading:false
}

export function usersReducer(state=initialState,action:UsersActions.UsersActions){
    switch(action.type){

        case UsersActions.FETCH_APPOINTMENTS:
            return{
                ...state,
                isLoading:true
            }
        case UsersActions.SET_APPOINTMENT:
            return{
                ...state,
                appointments:[...state.appointments,action.payload]
            }
        
            case UsersActions.APPOINTMENTS_SUCCESS:
                return{
                    ...state,
                    isLoading:false
                }

        case UsersActions.SET_APPOINTMENTS:
            return{
                ...state,
                appointments: [...action.payload]
            }

        case UsersActions.UPDATE_APPOINTMENTS:
            const updatedAppointment={
                ...state.appointments[action.payload.index],
                ...action.payload.updatedAppointment
            }
            const updatedAppointments=[...state.appointments];
            updatedAppointments[action.payload.index]=updatedAppointment;

            return{
                ...state,
                appointments: updatedAppointments
            }

        case UsersActions.DELETE_APPOINTMENT:
            return{
                ...state,
                appointments: state.appointments.filter((appointment,index)=>{
                    return index!=action.payload;
                })
            }
        default:
            return state;
    }
}