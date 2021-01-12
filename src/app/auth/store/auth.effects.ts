import {HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import * as AuthActions from './auth.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class AuthEffects{

    constructor(private actions$: Actions,private http:HttpClient,private store:Store<fromApp.AppState>){}

    @Effect()
    authRegister=this.actions$.pipe(
        ofType(AuthActions.REGISTRATION_START),
        switchMap((registerAction:AuthActions.RegistrationStart)=>{
            return this.http.post(
                'https://appointment-scheduler-f662d-default-rtdb.firebaseio.com/register/registration.json',
                 registerAction.payload
            )
        }),
        map((response)=>{
            return new AuthActions.RegistrationSuccess();
        })
    )
    
}