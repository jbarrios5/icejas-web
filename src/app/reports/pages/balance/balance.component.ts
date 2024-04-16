import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import {MONTHS} from "../../../constants/icejas-constants"
import { ReportService } from "../../service/report.service";
import {  buildEndMonth, buildStartMonth } from "./balance-util";
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

  //form control
  public reportTransactionFormControl = new FormGroup({
    startMonth: new FormControl(''),
    endMonth: new FormControl('')
  })
  //Table
  public ELEMENT_DATA: TransactionReportElement[] = [];
  public displayedColumns: string[] = ['mes', 'ingreso', 'egreso', 'saldo'];
  public dataSource =new MatTableDataSource<TransactionReportElement>(this.ELEMENT_DATA)
 
  constructor(private reportService:ReportService,private router:Router){}

  ngOnInit(): void {
    this.getTransactionSummary()
  }


  getTransactionSummary():void{
    let {startMonth,endMonth} = this.reportTransactionFormControl.value;
    startMonth = buildStartMonth(startMonth ||'');
    endMonth   = buildEndMonth(endMonth || ''); 
    this.ELEMENT_DATA = []
    this.reportService.getSummaryMonth(startMonth,endMonth)
      .subscribe(
        res => {
          if(!res){
            Swal.fire('Error', 'Error inesperado', 'error')
            this.router.navigateByUrl("/dashboard/home")
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
          this.addData()
        }
        
      )
  }
  addData(): void {
    this.dataSource = new MatTableDataSource<TransactionReportElement>(this.ELEMENT_DATA)
  }

  cleanData():void{
    this.reportTransactionFormControl.controls['endMonth'].setValue(null)
    this.reportTransactionFormControl.controls['startMonth'].setValue(null)
    this.getTransactionSummary()
  }
}