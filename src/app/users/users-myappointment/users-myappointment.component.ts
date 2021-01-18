import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Appointments } from '../appointments.model';
import * as fromApp from '../../store/app.reducer';
import * as UsersActions from '../store/users.action';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersEditService } from '../users-edit/users-edit.service';

@Component({
  selector: 'app-users-myappointment',
  templateUrl: './users-myappointment.component.html',
  styleUrls: ['./users-myappointment.component.css']
})
export class UsersMyappointmentComponent implements OnInit {

  appointments: Appointments[]
  Myappointments: Appointments[];
  storeSub: Subscription;
  storeAuthSub:Subscription;
  isLoading=false;
  loggedInUser=null;

  constructor(private store:Store<fromApp.AppState>,private router: Router,private route: ActivatedRoute,private userEditService:UsersEditService) { }

  ngOnInit(): void {

    this.storeAuthSub=this.store.select('auth').subscribe(
      authState=>{
        this.loggedInUser=authState.user.email.split('@')[0];
      }
    );

    this.storeSub=this.store.select('users').subscribe(
      usersState=>{
        this.appointments=usersState.appointments;
        this.Myappointments=usersState.appointments.filter(appointment=>{
          return this.loggedInUser==appointment.createdBy
        });
      }
    );
  }

  onEdit(myindex: number){
    let appointmentIndex:number;
    this.appointments.find((appointment,index)=>{
      if(this.Myappointments[myindex]==appointment){
        appointmentIndex=index;
        return true;
      }
    })
    this.router.navigate(['../',appointmentIndex,'edit'],{relativeTo:this.route});
  }

  onDelete(myindex: number){
    let appointmentIndex:number;
    this.appointments.find((appointment,index)=>{
      if(this.Myappointments[myindex]==appointment){
        appointmentIndex=index;
        return true;
      }
    })
    if(this.userEditService.confirmMessage('Are you sure you want to Delete?')){
    this.store.dispatch(new UsersActions.DeleteAppointment(appointmentIndex));
  }
  }

  onCreateAppointment(){
    this.router.navigate(['../','create'],{relativeTo:this.route});
  }

  ngOnDestroy(){
    this.storeSub.unsubscribe();
    this.storeAuthSub.unsubscribe();
  }


}
