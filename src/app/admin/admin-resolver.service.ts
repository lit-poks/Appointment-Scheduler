import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RegistrationRequest } from "./registration-request.model";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { take,map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import * as AdminActions from './store/admin.actions';


@Injectable({providedIn:'root'})
export class AdminResolverService implements Resolve<RegistrationRequest[]>{

    constructor(private store:Store<fromApp.AppState>,private actions$:Actions){}

    resolve(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
        return this.store.select('admin').pipe(
            take(1),
            map(adminState=>{
                return adminState.register
            }),
            switchMap(registration=>{
                    this.store.dispatch(new AdminActions.FetchRegistration());
                    return this.actions$.pipe(
                        ofType(AdminActions.SET_REGISTRATION),take(1)
                    );
            })
        )
    }

}