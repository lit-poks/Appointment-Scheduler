import {HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as AuthActions from './auth.actions';
import * as fromApp from '../../store/app.reducer';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication=(expiresIn: number,email:string,userId:string,token:string)=>{
    const expirationDate=new Date(new Date().getTime()+ +expiresIn*1000);
    const user=new User(email,userId,token,expirationDate);
    localStorage.setItem('userData',JSON.stringify(user));
     return new AuthActions.LoginSuccess({email:email,userId: userId,token: token,expirationDate:expirationDate,redirect:true})
}

const handleError=(errorRes:any)=>{
    let errorMessage='An Unknown error Occured!';
            if(!errorRes.error || !errorRes.error.error){
                return of(new AuthActions.AuthenticationFail(errorMessage));
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS': errorMessage='This email exists already!';
                break;
                case 'EMAIL_NOT_FOUND': errorMessage='This email does not exist!';
                break;
                case 'INVALID_PASSWORD': errorMessage='Wrong Password';
                break;
            }
               return of(new AuthActions.AuthenticationFail(errorMessage))
}

@Injectable()
export class AuthEffects{

    constructor(private actions$: Actions,private http:HttpClient,private store:Store<fromApp.AppState>,private authService:AuthService,private router:Router){}

    @Effect()
    authRegister=this.actions$.pipe(
        ofType(AuthActions.REGISTRATION_START),
        switchMap((registerAction:AuthActions.RegistrationStart)=>{
            return this.http.post(
                'https://appointment-scheduler-f662d-default-rtdb.firebaseio.com/register/registration.json',
                 registerAction.payload
            ).pipe(
                map((response)=>{
                    return new AuthActions.RegistrationSuccess();
                }),
                catchError(errorRes=>{
                    return handleError(errorRes)
                })
            )
        })
        
    )

    @Effect()
    login=this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData:AuthActions.LoginStart)=>{
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(tap(
                resData=>{
                    this.authService.setLogoutTimer(+resData.expiresIn*1000)
                }),
                map(resData=>{
                    return handleAuthentication(+resData.expiresIn,resData.email,resData.localId,resData.idToken)
                }),catchError(errorRes=>{
                    return handleError(errorRes)
                })
            )
        })
    );

    @Effect({dispatch:false})
    authRedirect=this.actions$.pipe(
        ofType(AuthActions.LOGIN_SUCCESS),
        tap((loginSuccessAction:AuthActions.LoginSuccess)=>{
            if(loginSuccessAction.payload.email=='admin@admin.com' && loginSuccessAction.payload.redirect){
                
                this.router.navigate(['/admin']);
            }
            else if(loginSuccessAction.payload.email!='admin@admin.com' &&loginSuccessAction.payload.redirect){
                
                this.router.navigate(['/users']);
            }
        })
    );

    @Effect({dispatch:false})
    logout=this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(()=>{
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    )

    @Effect()
    autoLogin=this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(()=>{
            const userData: {email:string, id:string, _token:string,_tokenExpirationDate:string}=JSON.parse(localStorage.getItem('userData'));
            if(!userData){
                return {type: 'NOTHING'};
            }

            const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

            if(loadedUser.token){
                const expirationDuration=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration)
                return new AuthActions.LoginSuccess({
                    email:loadedUser.email,
                    userId:loadedUser.id,
                    token:loadedUser.token,
                    expirationDate:new Date(userData._tokenExpirationDate,),
                    redirect: false
                })
            }
            return {type: 'Nothing'}
        })
    )
    
}