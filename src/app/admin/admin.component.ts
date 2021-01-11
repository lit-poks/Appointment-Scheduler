import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Appointments } from '../users/appointments.model';
import { RegistrationRequest } from './registration-request.model';
import { Rooms } from './rooms.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit ,OnDestroy{

  constructor(private store:Store<fromApp.AppState>) { }
  rooms:Rooms[];
  registration: RegistrationRequest[];
  storeSub:Subscription;

  ngOnInit(): void {
    this.storeSub=this.store.select('admin').subscribe(
      (adminState)=>{
        this.rooms=adminState.rooms;
        this.registration=adminState.register
      }
    )
  }

  ngOnDestroy(){
    this.storeSub.unsubscribe();
  }

  

}
