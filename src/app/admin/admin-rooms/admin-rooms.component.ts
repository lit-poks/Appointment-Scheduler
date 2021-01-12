import { Component, OnInit, ViewChild } from '@angular/core';
import { Rooms } from '../rooms.model';
import * as fromApp from '../../store/app.reducer';
import * as AdminActions from '../store/admin.actions';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminRoomService } from './admin-room.service';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent implements OnInit {

  constructor(private store:Store<fromApp.AppState>,private adminRoomsService:AdminRoomService) { }

  @ViewChild('closeModal') closeModal;
  rooms:Rooms[];
  roomForm: FormGroup;
  error:string;

  ngOnInit(): void {
    this.store.select('admin').subscribe(appState=>{
      this.rooms=appState.rooms;
      this.initForm();
    })
  }

  initForm(){
    this.roomForm=new FormGroup({
      'roomNo':new FormControl(Validators.required),
      'roomName': new FormControl('',Validators.required)
    })
  }

  onSubmit(){
    if(this.adminRoomsService.checkExistingRoom(this.rooms,this.roomForm.value)){
      this.error='This Room already Exists';
    }
    else{
      this.error='';
      this.store.dispatch(new AdminActions.AddRooms(this.roomForm.value));
      this.closeModal.nativeElement.click();
    }
    
  }

  onClose(){
    this.error='';
    this.roomForm.reset();
  }

}
