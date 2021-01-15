import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Rooms } from "../rooms.model";
import * as fromApp from '../../store/app.reducer';
import * as AdminActions from '../store/admin.actions';
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { switchMap, take } from "rxjs/operators";
import { map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({providedIn:'root'})
export class AdminRoomResolverService implements Resolve<Rooms[]>{

    constructor(private store:Store<fromApp.AppState>,private actions$:Actions){}

    resolve(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
        return this.store.select('admin').pipe(
            take(1),
            map(adminState=>{
                return adminState.rooms
            }),
            switchMap(rooms=>{
                if(rooms.length==0){
                    this.store.dispatch(new AdminActions.FetchRooms());
                    return this.actions$.pipe(
                        ofType(AdminActions.SET_ROOMS),
                        take(1)
                    );

                }
                else{
                    return of(rooms);
                }
            })
        )
    }

}