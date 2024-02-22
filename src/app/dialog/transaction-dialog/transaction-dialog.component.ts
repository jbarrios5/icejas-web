import { DialogRef } from "@angular/cdk/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TransactionType } from "src/app/transactions/interface/transaction.interface";
import { TransactionElement } from "src/app/transactions/pages/list-transaction/list-transaction.component";
import { TransactionService } from "src/app/transactions/service/transactions.service";

@Component({
    selector: 'app-dialog-component',
    templateUrl: './transaction-dialog.component.html'
  })
export class TransactionDialogComponent implements OnInit{
  public isEditTypeActive:boolean = false;
  public dialogFormGroup = new FormGroup({
    amountDialog: new FormControl(0,{nonNullable:true}),
    detailsDialog: new FormControl(0,{nonNullable:true}),
    observationDialog: new FormControl('',{nonNullable:true}),
    typeTransactionDialog: new FormControl('',{nonNullable:true}),
    transactionDateDialog: new FormControl('',{nonNullable:true})
  })
  types:TransactionType[]=[];

  constructor(public dialogRef:DialogRef<TransactionDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: TransactionElement[], private transactionService:TransactionService){}
  
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
    
    this.dialogFormGroup.controls['amountDialog'].setValue(this.data[0].credit !== 0?this.data[0].credit:this.data[0].debit);
    this.dialogFormGroup.controls['observationDialog'].setValue(this.data[0].details);
    
    const detail = this.types.filter( x => x.description === this.data[0].type);
    
    this.dialogFormGroup.controls['detailsDialog'].setValue(detail[0].id); //este es el mat option
    this.dialogFormGroup.controls['typeTransactionDialog'].setValue(this.data[0].credit !== 0?'Ingreso':'Gasto')
    this.dialogFormGroup.controls['typeTransactionDialog'].disable();
    this.dialogFormGroup.controls['transactionDateDialog'].setValue(this.data[0].date);
  }

}