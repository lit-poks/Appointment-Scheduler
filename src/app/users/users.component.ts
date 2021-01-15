import { Component, OnDestroy, OnInit } from '@angular/core';
import { Appointments } from './appointments.model';
import * as fromApp from '../store/app.reducer';
import * as UsersActions from './store/users.action';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersEditService } from './users-edit/users-edit.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy{

  appointments: Appointments[];
  storeSub: Subscription;
  storeAuthSub:Subscription;
  isLoading=false;
  date;
  loggedInUser=null;


  constructor(private store:Store<fromApp.AppState>,private router: Router,private route:ActivatedRoute,private userEditService:UsersEditService) { }

  ngOnInit(): void {
    
    this.storeSub=this.store.select('users').subscribe(
      usersState=>{
        this.appointments=usersState.appointments;
      }
    );
    this.storeAuthSub=this.store.select('auth').subscribe(
      authState=>{
        this.loggedInUser=authState.user.email.split('@')[0];
      }
    );
  }

  onEdit(index: number){
    this.router.navigate(['appointment',index,'edit'],{relativeTo:this.route});
  }

  onDelete(index: number){
    if(this.userEditService.confirmMessage('Are you sure you want to Delete?')){
    this.store.dispatch(new UsersActions.DeleteAppointment(index));
  }
  }

  onCreateAppointment(){
    this.router.navigate(['appointment','create'],{relativeTo:this.route});
  }

  ngOnDestroy(){
    this.storeSub.unsubscribe();
    this.storeAuthSub.unsubscribe();
  }


}
