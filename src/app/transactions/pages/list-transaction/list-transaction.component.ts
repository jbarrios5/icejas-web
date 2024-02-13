import { Component, OnInit } from '@angular/core';
import { Church } from '../../interface/church.interface';
import { TransactionService } from '../../service/transactions.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { TransactionType, TransactionTypePosResData } from '../../interface/transaction.interface';
export interface TransactionElement {
  date: string;
  id: number;
  details: string;
  type: string;
  credit: number;
  debit: number;
  balance: number;


}





@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent implements OnInit {
  ELEMENT_DATA: TransactionElement[] = [];
  displayedColumns: string[] = ['fecha', 'Nro', 'actividad', 'observacion', 'ingreso', 'egreso', 'saldo'];
  dataSource: TransactionElement[] = [];
  types: TransactionType[] = [];

  public transactionListForm = new FormGroup({
    transactionActivite: new FormControl('', { nonNullable: true }),
    transactionType: new FormControl('', { nonNullable: true }),
    transactionDateStart: new FormControl('', { nonNullable: true }),
    transactionDateEnd: new FormControl('', { nonNullable: true })
  })


  constructor(private transactionService: TransactionService) { }


  ngOnInit(): void {
    this.getTranasctionDetails();
    this.getTypes();
  }

  getTranasctionDetails(): void {
    let church: Church = JSON.parse(localStorage.getItem("church")!)
    this.transactionService.getTransactionDetails(church.id)
      .subscribe(res => {

        if (!res) {
          Swal.fire('Error', 'Error inesperado', 'error')
          return
        }
        console.log(res);

        res.data.details.forEach(data => {
          let trElement: TransactionElement = {
            id: data.transactionId,
            balance: data.currentBalance,
            date: data.registeredDate,
            details: data.transactionDetail,
            type: data.transactionTypeName,
            credit: data.transactionCategory === 'C' ? data.amount : 0,
            debit: data.transactionCategory === 'D' ? data.amount : 0,
          }
          this.ELEMENT_DATA.push(trElement);

        })

        this.addData()
      }
      )


  }

  addData(): void {
    this.dataSource = this.ELEMENT_DATA

  }
  filter(): void {
    const { transactionDateStart, transactionDateEnd, transactionActivite, transactionType } = this.transactionListForm.value;
    console.log(transactionDateStart, transactionDateEnd);
  }

  getTypes(): void {
    if (this.transactionService.transactionTypes.length === 0) {
      this.transactionService.getTransactionTypes()
        .subscribe((res: TransactionTypePosResData) => {
          res.data.transactionTypes.forEach(tr => this.types.push(tr));
          console.log(this.types);
        }
      )
    }
    else{
      this.types = this.transactionService.transactionTypes;
    }

  }
}
