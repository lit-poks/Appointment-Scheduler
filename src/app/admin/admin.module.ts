import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AdminComponent } from "./admin.component";
import { AdminRoomsComponent } from './admin-rooms/admin-rooms.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AdminRoomService } from "./admin-rooms/admin-room.service";
import { AdminResolverService } from "./admin-resolver.service";

const routes: Routes=[
    {path: "",component:AdminComponent,data:{userType:'admin'},pathMatch: 'full',resolve:[AdminResolverService]},
    {path: "rooms",component:AdminRoomsComponent,data:{userType:'admin'},pathMatch: 'full'}
]

@NgModule({
    declarations:[
        AdminComponent,
        AdminRoomsComponent
    ],
    imports:[
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers:[
        AdminRoomService
    ]
})
export class AdminModule{}