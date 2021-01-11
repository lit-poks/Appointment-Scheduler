import { RegistrationRequest } from "../registration-request.model";
import { Rooms } from "../rooms.model";


export interface State{
    rooms: Rooms[];
    register: RegistrationRequest[],
    isLoading: boolean
}

const initialState:State={
    rooms:[
        new Rooms(1,'Meeting Hall'),
        new Rooms(2,'Canteen')
    ],
    register: [
        new RegistrationRequest('test2@test.com','root123'),
        new RegistrationRequest('test3@test.com','root123')
    ],
    isLoading:false
}

export function adminReducer(state=initialState,action){
    switch(action.type){
        default:
            return state;
    }
}