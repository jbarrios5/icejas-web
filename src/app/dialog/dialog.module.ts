import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { DialogComponent } from "./dialog.component";

@NgModule({
    declarations: [DialogComponent],
    imports: [
      CommonModule,
      MaterialModule
     
    ],
    providers: []
  })
  export class DialogModule { }