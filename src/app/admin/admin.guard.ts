import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';


@Injectable({providedIn:'root'})
export class AdminGuard implements CanActivate{


    constructor(private store: Store<fromApp.AppState>,private router:Router){}

    canActivate(route:ActivatedRouteSnapshot,router: RouterStateSnapshot):boolean | UrlTree | Promise<boolean | UrlTree>|Observable<boolean | UrlTree>{

        return this.store.select('auth').pipe(take(1),
        map(authState=>{
            return authState.user
        }),
        map(
            user=>{
                const isUser=user.email=='admin@admin.com';
                if(isUser){
                    return true;
                }

                return this.router.createUrlTree(['/users']);
            }
        ));

    }
}