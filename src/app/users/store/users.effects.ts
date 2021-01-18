import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import * as fromApp from '../../store/app.reducer';
import { Appointments } from "../appointments.model";
import * as UsersActions from '../store/users.action';
import {State} from './users.reducer';

@Injectable()
export class UsersEffectts{

    constructor(private store:Store<fromApp.AppState>,private actions$:Actions,private http:HttpClient){}

    @Effect({dispatch:false})
    postAppointments=this.actions$.pipe(
        ofType(UsersActions.SET_APPOINTMENT,UsersActions.UPDATE_APPOINTMENTS,UsersActions.DELETE_APPOINTMENT)
        ,withLatestFrom(this.store.select('users'))
        ,switchMap(([actionData,usersState]:[UsersActions.SetAppointment,State])=>{
            return this.http.put(
                'https://appointment-scheduler-f662d-default-rtdb.firebaseio.com/appointments/appointments.json',
                usersState.appointments
            )
        })
    )

    @Effect()
    fetchAppointments=this.actions$.pipe(
        ofType(UsersActions.FETCH_APPOINTMENTS),
        switchMap(()=>{
            return this.http.get<Appointments[]>(
                'https://appointment-scheduler-f662d-default-rtdb.firebaseio.com/appointments/appointments.json'
            );
        })
        ,map(appointments=>{
            if(appointments!=null){
            return appointments.map(appointment=>{
                return {
                    ...appointment,
                    date:new Date(appointment.date),
                    beginTime:new Date(appointment.beginTime),
                    endTime:new Date(appointment.endTime)
                }
            })
        }
        else{
            return [];
        }
        })
        ,map(appointments=>{
            return new UsersActions.SetAppointments(appointments);
        }),
        catchError((error)=>{
            return of({type:'abcd'});
        })
    )

    @Effect()
    appointmentSuccess=this.actions$.pipe(
        ofType(UsersActions.SET_APPOINTMENTS),
        map(()=>{
            return new UsersActions.AppointmentsSuccess();
        })
    )


}