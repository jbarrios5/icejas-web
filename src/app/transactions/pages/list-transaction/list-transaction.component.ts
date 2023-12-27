import { Component, OnInit } from '@angular/core';
import { Church } from '../../interface/church.interface';
import { TransactionService } from '../../service/transactions.service';
import Swal from 'sweetalert2';
export interface TransactionElement {
  date: string;
  details: string;
  type:string;
  credit: number;
  debit: number;
  balance:number;


}





@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent implements OnInit{
  ELEMENT_DATA: TransactionElement[] = [
    {date: '10/12/2023',type:'Ofrenda', details: 'Ofrenda', credit: 10000, debit: 0,balance:10000},
    {date: '10/12/2023',type:'Ofrenda', details: 'Ofrenda', credit: 10000, debit: 0,balance:20000},
    {date: '10/12/2023',type:'Gasto varios', details: 'Pago cuota terreo + agua + luz', credit: 0, debit: 10000,balance:10000},
    
  ];
  displayedColumns: string[] = ['fecha', 'tipo','detalle', 'ingreso', 'egreso','saldo'];
  dataSource = this.ELEMENT_DATA;

  constructor(private transactionService:TransactionService){}
  ngOnInit(): void {
    this.getTranasctionDetails();
  }

  getTranasctionDetails():void{
    let church:Church = JSON.parse(localStorage.getItem("church")!)
    this.transactionService.getTransactionDetails(church.id)
    .subscribe(res => {

      if(!res){
        Swal.fire('Error', 'Error inesperado', 'error')
        return 
      }
      console.log(res);
      
      res.data.details.forEach( data => {
        let trElement :TransactionElement = {
          balance:data.amount,
          date:data.registeredDate,
          details:data.transactionDetail,
          type:data.transactionCategory,
          credit: data.transactionCategory === 'C'? data.amount:0,
          debit:data.transactionCategory === 'D'? data.amount : 0,
        }
        this.ELEMENT_DATA.push(trElement);
        
      })
      debugger;
      this.dataSource = this.ELEMENT_DATA
    }
    ) 

  }
}
