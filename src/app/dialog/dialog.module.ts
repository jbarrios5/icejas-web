import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { DeleteDialogComponet } from "./delete-dialog/delete-dialog.component";
import { TransactionDialogComponent } from "./transaction-dialog/transaction-dialog.component";

@NgModule({
    declarations: [TransactionDialogComponent,DeleteDialogComponet],
    imports: [
      CommonModule,
      MaterialModule,
      ReactiveFormsModule,
     
    ],
    providers: []
  })
  export class DialogModule { }