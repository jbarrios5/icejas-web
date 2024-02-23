import { DialogRef } from "@angular/cdk/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "src/app/auth/models/AuthLogin";
import { Transaction, TransactionPostReq, TransactionPostReqData, TransactionType } from "src/app/transactions/interface/transaction.interface";
import { TransactionElement } from "src/app/transactions/pages/list-transaction/list-transaction.component";
import { TransactionService } from "src/app/transactions/service/transactions.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-dialog-component',
    templateUrl: './transaction-dialog.component.html'
  })
export class TransactionDialogComponent implements OnInit{
  public isEditTypeActive:boolean = false;
  transaction:Transaction  ={
    amount:0,
    details:'',
    id:0,
    registerDate:''
  };
  user!:User;
  transactionPostReqData: TransactionPostReqData = {} as TransactionPostReqData;
  transactionPostReq:  TransactionPostReq = {} as TransactionPostReq;
  public dialogFormGroup = new FormGroup({
    amountDialog: new FormControl(0,{nonNullable:true}),
    detailsDialog: new FormControl(0,{nonNullable:true}),
    observationDialog: new FormControl('',{nonNullable:true}),
    typeTransactionDialog: new FormControl('',{nonNullable:true}),
    transactionDateDialog: new FormControl(new Date(),{nonNullable:true})
  })
  types:TransactionType[]=[];

  constructor(public dialogRef:MatDialogRef<boolean>,@Inject(MAT_DIALOG_DATA) public data: TransactionElement[], private transactionService:TransactionService){}
  
  ngOnInit(): void {
    this.getTypes()
    this.loadData()
    
  }
  
  
  onNoClick(): void {
    this.dialogRef.close("test");
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
    debugger;
    const year = this.data[0].date.substring(0, 4);
    const month = this.data[0].date.substring(5, 7);
    const day = this.data[0].date.substring(8, 10);
    // Crea un objeto Date en la zona horaria local
    const localDate = new Date(parseInt(year), parseInt(month) -1, parseInt(day));
    console.log(localDate);
    
    this.dialogFormGroup.controls['transactionDateDialog'].setValue(localDate);
  }
  updateTransaction():void{
    const {amountDialog ,detailsDialog,transactionDateDialog,observationDialog}=this.dialogFormGroup.value;
    debugger;
    this.transaction.amount = Number(amountDialog) || 0;
    this.transaction.details = observationDialog || 'Sin observacion'
    const agregarCeroSiEsNecesario = (numero:number) => (numero < 10 ? `0${numero}` : numero);
    this.transaction.registerDate =  `${transactionDateDialog?.getFullYear()}-${agregarCeroSiEsNecesario(transactionDateDialog?.getMonth()! + 1)}-${agregarCeroSiEsNecesario(transactionDateDialog?.getDate()!)}`;
    ;
    this.transaction.id = this.data[0].id;
    
    this.transactionPostReq.church = JSON.parse(localStorage.getItem("church") || '') 
    this.transactionPostReq.transaction = this.transaction;
    this.transactionPostReq.transactionType = this.types.find(t => t.id === Number(detailsDialog))!;
    this.user = JSON.parse(localStorage.getItem("user")||'');
    this.transactionPostReq.userId = this.user.id;
    this.transactionPostReqData.data = this.transactionPostReq;
    console.log(this.transactionPostReqData);
    
    this.transactionService.updateTransaction(this.transactionPostReqData)
    .subscribe((res:boolean) => {
      if(res){
        Swal.fire({
          icon: 'success',
          title: 'Movimiento modificado exitosamente!',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
         
      })
      this.dialogRef.close(true)
     
      }else{
          Swal.fire('Error', 'Error inesperado', 'error')
      }  
    })
  }

}