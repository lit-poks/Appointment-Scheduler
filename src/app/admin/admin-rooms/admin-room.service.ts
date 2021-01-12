import { Injectable } from "@angular/core";
import { Rooms } from "../rooms.model";

@Injectable()
export class AdminRoomService{

    checkExistingRoom(rooms:Rooms[],newRoom:Rooms):boolean{
        let duplicate=false;
        rooms.forEach(room=>{
            if(room.roomName===newRoom.roomName||room.roomNo===newRoom.roomNo){
            duplicate=true;
            }
        });
        return duplicate;
    }
}