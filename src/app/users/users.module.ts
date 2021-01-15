import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { UsersComponent } from "./users.component";
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersResolverService } from "./users-resolver.service";
import { UsersEditService } from "./users-edit/users-edit.service";
import { AuthGuard } from "../auth/auth.guard";
import { UsersGuard } from "./users.guard";

const routes:Routes=[
    {path: '', component:UsersComponent,data:{userType: 'non-admin'},canActivate:[AuthGuard,UsersGuard],resolve:[UsersResolverService]},
    {path:'appointment',data:{userType: 'non-admin'},canActivate:[AuthGuard],resolve:[UsersResolverService],children:[
        {path:'create',component:UsersEditComponent,pathMatch:'full'},
        {path: ':index/edit',component:UsersEditComponent,pathMatch:'full'}
    ]}
]

@NgModule({
    declarations:[
        UsersComponent,
        UsersEditComponent,
    ],
    imports:[
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers:[
        UsersEditService
    ]
})
export class UsersModule{}