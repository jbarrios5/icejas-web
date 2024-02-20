import { DialogRef } from "@angular/cdk/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TransactionType } from "../transactions/interface/transaction.interface";
import { TransactionElement } from "../transactions/pages/list-transaction/list-transaction.component";
import { TransactionService } from "../transactions/service/transactions.service";

@Component({
    selector: 'app-dialog-component',
    templateUrl: './dialog.component.html'
  })
export class DialogComponent implements OnInit{
  public dialogFormGroup = new FormGroup({
    amount: new FormControl('',{nonNullable:true}),
    details: new FormControl('',{nonNullable:true}),
    observation: new FormControl('',{nonNullable:true}),
    typeTransaction: new FormControl('',{nonNullable:true}),
    transactionDate: new FormControl('',{nonNullable:true})
  })
  types:TransactionType[]=[];

  constructor(public dialogRef:DialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: TransactionElement, private transactionService:TransactionService){}
  ngOnInit(): void {
    this.getTypes()
  }
  
  
  onNoClick(): void {
    this.dialogRef.close();
  }


  getTypes():void{
    this.types = this.transactionService.transactionTypes;

  }

}