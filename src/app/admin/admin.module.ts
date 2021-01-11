import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AdminComponent } from "./admin.component";
import { AdminRoomsComponent } from './admin-rooms/admin-rooms.component';
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes=[
    {path: "",component:AdminComponent,data:{userType:'admin'},pathMatch: 'full'},
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
    ]
})
export class AdminModule{}