import { Rooms } from "../admin/rooms.model";

export class Appointments{
    public name: string;
    public date: Date;
    public beginTime: Date;
    public endTime: Date;
    public room: Rooms;
    public createdBy: string;

    constructor(name: string,date: Date,beginTime: Date,endTime: Date,room: Rooms,createdBy: string){
        this.name=name;
        this.date=date;
        this.beginTime=beginTime;
        this.endTime=endTime;
        this.room=room;
        this.createdBy=createdBy;
    }
}