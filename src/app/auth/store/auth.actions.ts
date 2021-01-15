import { Action } from "@ngrx/store";

export const LOGIN_START='[Auth] Login Start';
export const LOGIN_SUCCESS='[Auth] Login Succcess';
export const REGISTRATION_START='[Auth] Registration Start';
export const REGISTRATION_SUCCESS='[Auth] Registration Success';
export const AUTHENTICATION_FAIL='[Auth] Authentication Failed';
export const LOGOUT='[Auth] Login Fail';
export const AUTO_LOGIN='[Auth] Auto Login';
export const CLEAR_ERROR='[Auth] Clear Error'

export class RegistrationStart implements Action{
    readonly type=REGISTRATION_START;
    constructor(public payload: {email:string,password:string}){}
}

export class RegistrationSuccess implements Action{
    readonly type=REGISTRATION_SUCCESS;
}

export class AuthenticationFail implements Action{
    readonly type=AUTHENTICATION_FAIL;
    constructor(public payload: string){}
}

export class LoginStart implements Action{
    readonly type=LOGIN_START;
    constructor(public payload:{email:string,password:string}){}
}

export class LoginSuccess implements Action{
    readonly type=LOGIN_SUCCESS;
    constructor(public payload:{email: string, userId: string, token: string, expirationDate: Date}){}
}

export class Logout implements Action{
    readonly type=LOGOUT;
}

export class ClearError implements Action{
    readonly type=CLEAR_ERROR;
}

export class AutoLogin implements Action{
    readonly type=AUTO_LOGIN;
}


export type AuthActions=RegistrationStart|RegistrationSuccess|AuthenticationFail|LoginStart|LoginSuccess|ClearError|AutoLogin|Logout;