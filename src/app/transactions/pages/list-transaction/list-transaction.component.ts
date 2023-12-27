import { Component, OnInit } from '@angular/core';
import { Church } from '../../interface/church.interface';
import { TransactionService } from '../../service/transactions.service';
import Swal from 'sweetalert2';
export interface TransactionElement {
  date: string;
  id:number;
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
  
    
  ];
  displayedColumns: string[] = ['fecha','Nro', 'tipo','detalle', 'ingreso', 'egreso','saldo'];
  dataSource: TransactionElement [] = [];

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
          id:data.transactionId,
          balance:data.currentBalance,
          date:data.registeredDate,
          details:data.transactionDetail,
          type:data.transactionTypeName,
          credit: data.transactionCategory === 'C'? data.amount:0,
          debit:data.transactionCategory === 'D'? data.amount : 0,
        }
        this.ELEMENT_DATA.push(trElement);
        
      })

      this.addData()
    }
    ) 
    console.log("Finish get transacionc");
    
    
  }

  addData():void{
    console.log("Adding transaction");
    this.dataSource = this.ELEMENT_DATA
  }
}
