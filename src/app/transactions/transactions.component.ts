import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Church } from './interface/church.interface';
import { TransactionType, TransactionTypePosResData } from './interface/transaction.interface';
import { TransactionService } from './service/transactions.service';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html'
})

export class TransactionsComponent implements OnInit{
  types:TransactionType[]=[]
  church!:Church;
  constructor(private transactionService:TransactionService){}

  public transactionForm = new FormGroup({
    amount: new FormControl('',{nonNullable:true}),
    details: new FormControl('',{nonNullable:true}),
    typeTransaction: new FormControl('',{nonNullable:true})
  })

  ngOnInit(): void {
    this.getTransactionsType();  
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
    
  }

  addTransaction():void{
    const {amount,details,typeTransaction}=this.transactionForm.value;

    
     
  }

}
