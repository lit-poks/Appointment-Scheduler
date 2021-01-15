import { Action } from "@ngrx/store";
import { Appointments } from "../appointments.model";


export const FETCH_APPOINTMENTS='[Users] Fetch Appointments';
export const SET_APPOINTMENT='[Users] Set single Appointment';
export const SET_APPOINTMENTS='[Users] Set all Appointments';
export const APPOINTMENTS_SUCCESS='[Users] Appointments Success';
export const UPDATE_APPOINTMENTS='[Users] Update Appointments';
export const DELETE_APPOINTMENT='[Users] Delete Appointments';



export class FetchAppointments implements Action{
    readonly type=FETCH_APPOINTMENTS;
}

export class SetAppointment implements Action{
    readonly type=SET_APPOINTMENT;
    constructor(public payload:Appointments){}
}

export class AppointmentsSuccess implements Action{
    readonly type=APPOINTMENTS_SUCCESS;
}
export class UpdateAppointments implements Action{
    readonly type=UPDATE_APPOINTMENTS;
    constructor(public payload:{index:number, updatedAppointment:Appointments}){}
}

export class SetAppointments implements Action{
    readonly type=SET_APPOINTMENTS;
    constructor(public payload:Appointments[]){}
}

export class DeleteAppointment implements Action{
    readonly type=DELETE_APPOINTMENT;
    constructor(public payload:number){}
}

export type UsersActions=FetchAppointments|SetAppointment|AppointmentsSuccess|UpdateAppointments|SetAppointments|DeleteAppointment;

