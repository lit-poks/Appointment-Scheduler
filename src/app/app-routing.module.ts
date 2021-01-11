import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes=[
    {path: '',redirectTo: '/auth',pathMatch: 'full'},
    {path: 'auth',loadChildren:()=>import('./auth/auth.module').then(auth=>auth.AuthModule)},
    {path: 'admin',loadChildren:()=>import('./admin/admin.module').then(admin=>admin.AdminModule)},
    {path: 'users',loadChildren:()=>import('./users/users.module').then(users=>users.UsersModule)}
]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules})],
    exports:[RouterModule]
})
export class AppRoutingModule{

}