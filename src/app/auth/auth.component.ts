import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {map} from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  isLoading:boolean=false;
  authenticationForm: FormGroup;
  authError=null;
  errorMessage:string;
  storeSub:Subscription;

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.storeSub=this.store.select('auth').subscribe(authState=>{
      this.isLoading=authState.isLoading,
      this.authError=authState.authError
    })
    this.initForm();
    
  }

  onRegister(){
    console.log(this.authenticationForm.value);
    this.store.dispatch(new AuthActions.RegistrationStart(this.authenticationForm.value));
    this.authenticationForm.reset();
  }

  initForm(){
    this.authenticationForm=new FormGroup({
      'email': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  onHandleError(){
    this.authError=this.store.dispatch(new AuthActions.ClearError());
  }

  onSignin(){
    this.store.dispatch(new AuthActions.LoginStart(this.authenticationForm.value));
    this.authenticationForm.reset();
  }

  ngOnDestroy(){
    this.storeSub.unsubscribe();
  }

}
