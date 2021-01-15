import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Rooms } from 'src/app/admin/rooms.model';

import * as fromApp from '../../store/app.reducer';
import * as UsersActions from '../store/users.action';
import { Appointments } from '../appointments.model';
import { UsersEditService } from './users-edit.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit ,OnDestroy{

  appointmentForm:FormGroup;
  editMode:boolean=false;
  appointmentIndex:number;
  storeAdminSub:Subscription;
  storeAuthSub:Subscription;
  rooms:Rooms[];
  booked:boolean=false;
  email:string;

  constructor(private route: ActivatedRoute,private router:Router,private store: Store<fromApp.AppState>,private usersEditService:UsersEditService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params:Params)=>{
        this.appointmentIndex=+params['index'];
        this.editMode=params['index']!=null;
      }
    );

    this.storeAdminSub=this.store.select('admin').subscribe(
      adminState=>{
        this.rooms=adminState.rooms
      }
    );
    this.storeAuthSub=this.store.select('auth').subscribe(
      authState=>{
        this.email=authState.user.email.split('@')[0];
      }
    )
    this.initForm();

  }

  initForm(){
    let name='';
    let date:Date=new Date();
    let timeStart:Date=new Date();
    let timeEnd:Date=new Date();
    let roomNo:number;
    let roomName:string='select';
    let createdBy=this.email;

    if(this.editMode){
      this.store.select('users').pipe(
        take(1),
        map(usersState=>{
          return usersState.appointments.find((appointment,index)=>{
            return index==this.appointmentIndex;
          })
        })
      ).subscribe(
        appointment=>{
          name=appointment.name,
          date=appointment.date,
          timeStart=appointment.beginTime,
          timeEnd=appointment.endTime,
          roomNo=appointment.room.roomNo,
          roomName=appointment.room.roomName,
          createdBy=appointment.createdBy
        }
      );
      }
    
    this.appointmentForm=new FormGroup({
      'name':new FormControl(name,Validators.required),
      'date':new FormControl(date.toISOString().split('T')[0],Validators.required),
      'timeStart':new FormControl(timeStart.toTimeString().split(' ')[0],Validators.required),
      'timeEnd':new FormControl(timeEnd.toTimeString().split(' ')[0],Validators.required),
      'room':new FormControl(roomName,Validators.required),
      'createdBy':new FormControl(createdBy)
    })
  }

  onSubmit(){
    let name=this.appointmentForm.value.name;
    let date=new Date(this.appointmentForm.value.date);
    let beginTime=new Date(date.toDateString()+' '+this.appointmentForm.value.timeStart);
    let endTime=new Date(date.toDateString()+' '+this.appointmentForm.value.timeEnd);;
    let room:Rooms=this.rooms.find(room=>{
      return this.appointmentForm.value.room==room.roomName
    });
    let createdBy:string=this.appointmentForm.value.createdBy;
    let appointment:Appointments=new Appointments(name,date,beginTime,endTime,room,createdBy);

    if(!this.usersEditService.checkAppointmentValidity(appointment)){
      this.booked=false;
      if(this.editMode){
        this.store.dispatch(new UsersActions.UpdateAppointments({index:this.appointmentIndex,updatedAppointment:appointment}));
        alert('Successfully Edited!');
      }
      else{
        this.store.dispatch(new UsersActions.SetAppointment(appointment));
        alert('Appointment Created!');
      }
      this.router.navigate(['/users']);
    }
    else{
      this.booked=true;
    }
    
  }

  onCancle(){
    this.appointmentForm.reset();
    this.router.navigate(['/users']);
  }

  ngOnDestroy(){
    this.storeAdminSub.unsubscribe();
    this.storeAuthSub.unsubscribe();
  }

}
