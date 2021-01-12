import { Action } from "@ngrx/store";
import { RegistrationRequest } from "../registration-request.model";
import { Rooms } from "../rooms.model";


export const ADD_ROOMS='[Admin] Add Rooms';
export const APPROVE_REGISTRATION='[Admin] Approve Users';
export const DECLINE_REGISTRATION='[Admin] Decline Users';
export const PROCESSS_REGISTRATION='[Admin] Process Registration';
export const FETCH_REGISTRATION='[Admin] Fetch Registration';
export const FETCH_ROOMS='[Admin] Fetch Rooms';
export const SET_REGISTRATION='[Admin] Set Registration';
export const SET_ROOMS='[Admin] Set Rooms';

export class AddRooms implements Action{
    readonly type=ADD_ROOMS;
    constructor(public payload:Rooms){}
}

export class ApproveRegistration implements Action{
    readonly type=APPROVE_REGISTRATION;
    constructor(public payload: number){}
}

export class DeclineRegistration implements Action{
    readonly type=DECLINE_REGISTRATION;
    constructor(public payload: number){}
}

export class ProcessRegistration implements Action{
    readonly type=PROCESSS_REGISTRATION;
    constructor(public payload: number){}
}

export class FetchRegistration implements Action{
    readonly type=FETCH_REGISTRATION;
}

export class FetchRooms implements Action{
    readonly type=FETCH_ROOMS;
}

export class SetRegistration implements Action{
    readonly type=SET_REGISTRATION;
    constructor(public payload:RegistrationRequest[]){}
}


export class SetRooms implements Action{
    readonly type=SET_ROOMS;
    constructor(public payload:Rooms[]){}
}
export type AdminActions=AddRooms|ApproveRegistration|DeclineRegistration|ProcessRegistration|FetchRegistration|FetchRooms|SetRegistration|SetRooms;