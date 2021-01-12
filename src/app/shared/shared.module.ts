import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { ErrorBoxComponent } from './error-box/error-box.component';

@NgModule({
    declarations:[
        LoadingSpinnerComponent,
        HeaderComponent,
        ErrorBoxComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports:[
        ErrorBoxComponent,
        LoadingSpinnerComponent,
        CommonModule,
        HeaderComponent
    ]
})
export class SharedModule{}
