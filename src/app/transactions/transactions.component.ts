import { Component, OnInit } from '@angular/core';
import { TransactionType, TransactionTypePosResData } from './interface/transaction.interface';
import { TransactionService } from './service/transactions.service';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html'
})

export class TransactionsComponent implements OnInit{
  types:TransactionType[]=[]
  constructor(private transactionService:TransactionService){}
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

}
