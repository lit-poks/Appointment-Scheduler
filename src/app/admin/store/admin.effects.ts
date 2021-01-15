import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, EffectsModule, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as fromApp from '../../store/app.reducer';
import { RegistrationRequest } from "../registration-request.model";
import { Rooms } from "../rooms.model";
import * as AdminActions from '../store/admin.actions';
import { State } from './admin.reducer';


@Injectable()
export class AdminEffects {
    constructor(private store: Store<fromApp.AppState>, private http: HttpClient, private actions$: Actions) { }

    @Effect()
    fetchRegistration = this.actions$.pipe(
        ofType(AdminActions.FETCH_REGISTRATION),
        switchMap(() => {
            return this.http.get<RegistrationRequest[]>(
                'https://appointment-scheduler-f662d-default-rtdb.firebaseio.com/register/registration.json'
            );
        })
        , map(register => {
            console.log(register)
            let x: RegistrationRequest[] = [];
            for (let user in register) {
                x.push(register[user]);
            }
            return x;
        })
        , map(register => {
            console.log(register);
            return new AdminActions.SetRegistration(register);
        })
    )

    @Effect()
    processRegistrationApprove = this.actions$.pipe(
        ofType(AdminActions.APPROVE_REGISTRATION),
        withLatestFrom(this.store.select('admin'))
        , switchMap(([actionData, adminState]: [AdminActions.ApproveRegistration, State]) => {
            let email = adminState.register[actionData.payload].email;
            let password = adminState.register[actionData.payload].password;
            let index = actionData.payload;
            console.log(environment.firebaseAPIKey)
            return this.http.post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ).pipe(
                map(resData => {
                    return new AdminActions.ProcessRegistration(index);
                }),
                catchError((errRes: any) => {
                    if (!errRes.error || !errRes.error.error) {
                        alert('An Unknown errror Occured');
                    }
                    if (errRes.error.error.message === 'EMAIL_EXISTS') {
                        if (confirm('User Already Registered. Decline instead?')) {
                            return of(new AdminActions.ProcessRegistration(index));
                        }
                        else{
                            return of({type: 'RANDOM'});
                        }
                    }
                    alert('Successfully Approved');
                    return of({ type: 'asdfsda' })

                })
            )

        })
    )


    @Effect({ dispatch: false })
    persistChange = this.actions$.pipe(
        ofType(AdminActions.PROCESSS_REGISTRATION),
        withLatestFrom(this.store.select('admin')),
        switchMap(([actionData, adminState]) => {
            return this.http.put(
                'https://appointment-scheduler-f662d-default-rtdb.firebaseio.com/register/registration.json',
                adminState.register
            )
        })
    );

    @Effect()
    processRegistrationDecline = this.actions$.pipe(
        ofType(AdminActions.DECLINE_REGISTRATION),
        switchMap((adminAction: AdminActions.DeclineRegistration) => {
            return of(new AdminActions.ProcessRegistration(adminAction.payload));
        })
    )

    @Effect()
    fetchRooms=this.actions$.pipe(
        ofType(AdminActions.FETCH_ROOMS),
        switchMap(()=>{
            return this.http.get<Rooms[]>(
                'https://appointment-scheduler-f662d-default-rtdb.firebaseio.com/rooms/rooms.json'
            );
        })
        ,map(rooms=>{
            return rooms.map(rooms=>{
                return {...rooms}
            })
        })
        ,map(rooms=>{
            return new AdminActions.SetRooms(rooms);
        })
    )

    @Effect({dispatch:false})
    setRooms=this.actions$.pipe(
        ofType(AdminActions.ADD_ROOMS)
        ,withLatestFrom(this.store.select('admin'))
        ,switchMap(([actionData,adminState]:[AdminActions.SetRooms,State])=>{
            console.log(adminState.rooms)
            return this.http.put(
                'https://appointment-scheduler-f662d-default-rtdb.firebaseio.com/rooms/rooms.json',
                adminState.rooms
            )
        })
    )

}