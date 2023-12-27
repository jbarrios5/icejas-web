import { Component } from '@angular/core';
import { TransactionService } from '../../service/transactions.service';

export interface PeriodicElement {
  date: string;
  details: string;
  type:string;
  credit: string;
  debit: string;
  balance:string;


}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '10/12/2023',type:'Ofrenda', details: 'Ofrenda', credit: '10000', debit: '0',balance:'10000'},
  {date: '10/12/2023',type:'Ofrenda', details: 'Ofrenda', credit: '10000', debit: '0',balance:'20000'},
  {date: '10/12/2023',type:'Gasto varios', details: 'Pago cuota terreo + agua + luz', credit: '0', debit: '10000',balance:'10000'},
  
];



@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent {
  displayedColumns: string[] = ['fecha', 'tipo','detalle', 'ingreso', 'egreso','saldo'];
  dataSource = ELEMENT_DATA;

  constructor(private transactionService:TransactionService){}

  getTranasctionDetails():void{


  }
}
