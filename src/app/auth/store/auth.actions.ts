import { Action } from "@ngrx/store";

export const REGISTRATION_START='[Auth] Registration Start';
export const REGISTRATION_SUCCESS='[Auth] Registration Success';
export const AUTHENTICATION_FAIL='[Auth] Authentication Failed';

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

export type AuthActions=RegistrationStart|RegistrationSuccess|AuthenticationFail;