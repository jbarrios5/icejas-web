import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../auth/models/AuthLogin';
import { Church } from './interface/church.interface';
import { Transaction, TransactionPostReq, TransactionPostReqData, TransactionPostResData, TransactionType, TransactionTypePosResData } from './interface/transaction.interface';
import { TransactionService } from './service/transactions.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html'
})

export class TransactionsComponent implements OnInit{
  types:TransactionType[]=[];
  church!:Church;
  transaction:Transaction  ={
    amount:0,
    details:'',
    id:0,
    registerDate:''
  };
  user!:User;
  transactionPostReqData: TransactionPostReqData = {} as TransactionPostReqData;
  transactionPostReq:  TransactionPostReq = {} as TransactionPostReq;
  transactionType!:TransactionType ;
  public editable:boolean = false;

  constructor(private transactionService:TransactionService,private router:Router){}

  public transactionForm = new FormGroup({
    amount: new FormControl('',{nonNullable:true}),
    details: new FormControl('',{nonNullable:true}),
    observation: new FormControl('',{nonNullable:true}),
    typeTransaction: new FormControl('',{nonNullable:true}),
    transactionDate: new FormControl('',{nonNullable:true})
  })
 

  ngOnInit(): void {
    this.getTransactionsType();  
    this.getChurch();
    this.getUser();
    this.transactionForm.get('typeTransaction')?.disable(); 
    
  }
 

  getTransactionsType():void{
    this.transactionService.getTransactionTypes()
    .subscribe((res:TransactionTypePosResData) => {
      res.data.transactionTypes.forEach(tr => this.types.push(tr));
      console.log(this.types);
      
    }
    )
  }

  getChurch():void{
    this.church = JSON.parse(localStorage.getItem("church") || '') 
  }

  getUser():void{
    this.user = JSON.parse(localStorage.getItem("user")||'')
  }
  addTransaction():void{
    Swal.fire({
      icon: 'warning',
      title: '¿Estas seguro de agregar esta actividad?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
     
    }).then((result) => {
      if (result.isConfirmed) {
        this.processTransaction();
      }else{
        this.router.navigateByUrl("/dashboard/home")
      }
    })
  }
    
    
  processTransaction(): void {
    debugger;

    const {amount,details,typeTransaction,transactionDate,observation}=this.transactionForm.value;

    this.transaction.amount = Number(amount) || 0;
    this.transaction.details = observation || 'Sin observacion'
    this.transaction.registerDate = transactionDate!;
    this.transactionType  = this.types.find(t => t.id === Number(details))!;
    
    this.transactionPostReq.church = this.church
    this.transactionPostReq.transaction = this.transaction;
    this.transactionPostReq.transactionType = this.transactionType;
    this.transactionPostReq.userId = this.user.id;
    this.transactionPostReqData.data = this.transactionPostReq;
    this.transactionService.addTransaction(this.transactionPostReqData)
    .subscribe((res:TransactionPostResData) => {
      if(res){
        Swal.fire({
          icon: 'success',
          title: 'Movimiento agregado exitosamente!',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
         
      })
      setTimeout(()=>{
        this.router.navigateByUrl("/dashboard/home")
      },3000)
      }else{
          Swal.fire('Error', 'Error inesperado', 'error')
          this.router.navigateByUrl("/dashboard/home")
      }  
    })
  
  }
  setTypeTransaction():void{
    const {amount,details,typeTransaction,transactionDate}=this.transactionForm.value;
    console.log(details);
    const category= this.types.find(x => (x.id === Number(details)))
    console.log(category);
    
    this.transactionForm.controls['typeTransaction'].setValue(category?.category === 'D'?'Gasto':'Ingreso')
    
    
    
  }


}
