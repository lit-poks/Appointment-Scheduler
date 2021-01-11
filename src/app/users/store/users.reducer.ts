import { Rooms } from "src/app/admin/rooms.model";
import { Appointments } from "../appointments.model";


export interface State{
    appointments: Appointments[],
    isLoading:boolean
}

const initialState:State={
    appointments:[
        new Appointments('consultation',new Date(),new Date(),new Date(),new Rooms(1,'Room no 1'),'litpoks')
    ],
    isLoading:false
}

export function usersReducer(state=initialState,action){
    switch(action.type){
        default:
            return state;
    }
}