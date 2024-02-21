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
    amountDialog: new FormControl(0,{nonNullable:true}),
    detailsDialog: new FormControl('',{nonNullable:true}),
    observationDialog: new FormControl('',{nonNullable:true}),
    typeTransactionDialog: new FormControl('',{nonNullable:true}),
    transactionDateDialog: new FormControl('',{nonNullable:true})
  })
  types:TransactionType[]=[];

  constructor(public dialogRef:DialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: TransactionElement[], private transactionService:TransactionService){}
  
  ngOnInit(): void {
    this.getTypes()
    this.loadData()
    
  }
  
  
  onNoClick(): void {
    this.dialogRef.close();
  }


  getTypes():void{
    this.types = this.transactionService.transactionTypes;

  }
  loadData():void{
    console.log(this.data);
    
    this.dialogFormGroup.controls['amountDialog'].setValue(this.data[0].credit !== 0?this.data[0].credit:this.data[0].debit);
    this.dialogFormGroup.controls['observationDialog'].setValue(this.data[0].details);
  }

}