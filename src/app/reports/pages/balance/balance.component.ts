import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import {MONTHS} from "../../../constants/icejas-constants"
import { ReportService } from "../../service/report.service";
export interface TransactionReportElement {
  date: string;
  credit: number;
  debit: number;
  balance: number
}
@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.css']
  })
export class BalanceReporComponent implements OnInit{
  public months:string[]  = MONTHS;
  public sumAmount:number = 0
  //Table
  public ELEMENT_DATA: TransactionReportElement[] = [];
  public displayedColumns: string[] = ['mes', 'ingreso', 'egreso', 'saldo'];
  public dataSource =new MatTableDataSource<TransactionReportElement>(this.ELEMENT_DATA)
 
  constructor(private reportService:ReportService){}

  ngOnInit(): void {
    this.getTransactionSummary()
  }


  getTransactionSummary():void{
    this.reportService.getSummaryMonth("2024-01-01","2024-05-30")
      .subscribe(
        res => {
          if(!res){
            console.log('Ocurrio un error',res);
          }
          
          res.months.forEach( data =>{
            let trElement: TransactionReportElement = {
              date: MONTHS[data.month -1 ].charAt(0) +MONTHS[data.month -1].slice(1).toLowerCase() ,
              credit: data.totalCredit,
              debit: data.totalDebit,
              balance: data.totalSum              
            }
            this.ELEMENT_DATA.push(trElement);
          })
          this.sumAmount  =res.totalSum
        }
        
      )
  }
  addData(): void {
    this.dataSource = new MatTableDataSource<TransactionReportElement>(this.ELEMENT_DATA)
    
  }

}