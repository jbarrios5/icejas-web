import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../auth/models/AuthLogin';
import { Church } from './interface/church.interface';
import { Transaction, TransactionPostReq, TransactionPostReqData, TransactionPostResData, TransactionType, TransactionTypePosResData } from './interface/transaction.interface';
import { TransactionService } from './service/transactions.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



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

  constructor(private transactionService:TransactionService,private router:Router){}

  public transactionForm = new FormGroup({
    amount: new FormControl('',{nonNullable:true}),
    details: new FormControl('',{nonNullable:true}),
    typeTransaction: new FormControl('',{nonNullable:true}),
    transactionDate: new FormControl('',{nonNullable:true})
  })

  ngOnInit(): void {
    this.getTransactionsType();  
    this.getChurch();
    this.getUser();
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
    debugger;
    const {amount,details,typeTransaction,transactionDate}=this.transactionForm.value;

    this.transaction.amount = Number(amount) || 0;
    this.transaction.details = details || '';
    this.transaction.registerDate = transactionDate!;

    this.transactionType  = this.types.find(t => t.id === Number(typeTransaction))!;
    
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
          showConfirmButton: false,
         
      })
      setTimeout(()=>{
        this.router.navigateByUrl("/dashboard/home")
      },3000)
      
      
      }else{
      
          Swal.fire('Error', 'Error inesperado', 'error')
      }  
    }
    )
    
    
     
  }


}
