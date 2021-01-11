import { Component, OnInit } from '@angular/core';
import { Rooms } from '../rooms.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent implements OnInit {

  constructor(private store:Store<fromApp.AppState>) { }

  rooms:Rooms[];
  roomForm: FormGroup;

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
    console.log('here');
    console.log(this.roomForm);
  }

}
