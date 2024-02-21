import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { DialogComponent } from "./dialog.component";

@NgModule({
    declarations: [DialogComponent],
    imports: [
      CommonModule,
      MaterialModule,
      ReactiveFormsModule,
     
    ],
    providers: []
  })
  export class DialogModule { }