import { DialogRef } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TransactionType } from "../transactions/interface/transaction.interface";
import { TransactionElement } from "../transactions/pages/list-transaction/list-transaction.component";

@Component({
    selector: 'app-dialog-component',
    templateUrl: './dialog.component.html'
  })
export class DialogComponent{
   constructor(public dialogRef:DialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: TransactionElement){}
   onNoClick(): void {
    this.dialogRef.close();
  }
}