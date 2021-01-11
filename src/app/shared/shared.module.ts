import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations:[
        LoadingSpinnerComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports:[
        LoadingSpinnerComponent,
        CommonModule,
        HeaderComponent
    ]
})
export class SharedModule{}
