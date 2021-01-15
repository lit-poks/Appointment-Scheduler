import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import { Appointments } from "../appointments.model";


@Injectable()
export class UsersEditService{

    appointments:Appointments[];
    constructor(private store:Store<fromApp.AppState>){
        this.store.select('users').subscribe(
            usersState=>{
                this.appointments=usersState.appointments;
            }
        )
    }

    checkAppointmentValidity(appointment:Appointments):boolean{
        let booked=false;
        this.appointments.forEach(app=>{
            if(app.room.roomName==appointment.room.roomName){
                if(app.date.toDateString()==appointment.date.toDateString()){
                    if(appointment.beginTime.getTime()>=app.beginTime.getTime()&&appointment.beginTime.getTime()<=app.endTime.getTime()||
                    appointment.endTime.getTime()>=app.beginTime.getTime()&&appointment.endTime.getTime()<=app.endTime.getTime()){
                        booked=true;
                    }
                }
            }
        });
        return booked;
    }

    confirmMessage(message:string):boolean{
        return confirm(message);
    }

}