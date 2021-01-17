import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AdminActions from './store/admin.actions';
import { RegistrationRequest } from './registration-request.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit ,OnDestroy{

  constructor(private store:Store<fromApp.AppState>) { }
  registration: RegistrationRequest[];
  alertMessage:string;
  storeSub:Subscription;

  ngOnInit(): void {
    this.storeSub=this.store.select('admin').subscribe(
      (adminState)=>{
        this.registration=adminState.register
      }
    )
    this.registration
  }

  onApprove(index:number){
    this.store.dispatch(new AdminActions.ApproveRegistration(index));
  }

  onDecline(index:number){
    this.store.dispatch(new AdminActions.DeclineRegistration(index));
  }

  ngOnDestroy(){
    this.storeSub.unsubscribe();
  }
 

}
