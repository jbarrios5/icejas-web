import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { TransactionDialogComponent } from "./transaction-dialog/transaction-dialog.component";

@NgModule({
    declarations: [TransactionDialogComponent],
    imports: [
      CommonModule,
      MaterialModule,
      ReactiveFormsModule,
     
    ],
    providers: []
  })
  export class DialogModule { }