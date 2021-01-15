import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Appointments } from "./appointments.model";
import * as fromApp from '../store/app.reducer';
import { map, switchMap, take } from "rxjs/operators";
import * as UsersActions from './store/users.action';
import * as AdminActions from '../admin/store/admin.actions';
import { Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({providedIn:'root'})
export class UsersResolverService implements Resolve<Appointments[]>{

    constructor(private store:Store<fromApp.AppState>,private action$:Actions){}

    resolve(routte: ActivatedRouteSnapshot,state: RouterStateSnapshot){

        return this.store.select('users').pipe(
            take(1),
            map(usersState=>{
                return usersState.appointments
            }),
            switchMap(appointments=>{
                if(appointments.length==0){
                    this.store.dispatch(new UsersActions.FetchAppointments());
                    this.store.dispatch(new AdminActions.FetchRooms());
                    return this.action$.pipe(ofType(UsersActions.SET_APPOINTMENTS),take(1));
                }
                else{
                    this.store.dispatch(new AdminActions.FetchRooms());
                    return of(appointments);
                }
            })
        )
    }
}