import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Church } from '../../interface/church.interface';
import { TransactionService } from '../../service/transactions.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { TransactionType, TransactionTypePosResData } from '../../interface/transaction.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionDialogComponent } from 'src/app/dialog/transaction-dialog/transaction-dialog.component';
import { DeleteDialogComponet } from 'src/app/dialog/delete-dialog/delete-dialog.component';
export interface TransactionElement {
  date: string;
  id: number;
  details: string;
  type: string;
  credit: number;
  debit: number;


}

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent implements OnInit{

  public debit:string = "D";
  public credit:string = "C";
  public ELEMENT_DATA: TransactionElement[] = [];
  displayedColumns: string[] = ['fecha', 'Nro', 'actividad', 'observacion', 'ingreso', 'egreso','acciones'];
  dataSource =new MatTableDataSource<TransactionElement>(this.ELEMENT_DATA)
  types: TransactionType[] = [];
  church!:Church;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

 
  public transactionListForm = new FormGroup({
    transactionActivite: new FormControl('', { nonNullable: true }),
    transactionType: new FormControl('', { nonNullable: true }),
    transactionDateStart: new FormControl('', { nonNullable: true }),
    transactionDateEnd: new FormControl('', { nonNullable: true })
  })


  constructor(private transactionService: TransactionService, public dialog:MatDialog
    ) { 
    
  }
 
  ngOnInit(): void {
    this.getTranasctionDetails('','','','');
    this.getTypes();
  }

  openDialog(nro:number):void{
    const dialogRef = this.dialog.open(TransactionDialogComponent,{
      width: '85%',
      enterAnimationDuration:'400ms',
      exitAnimationDuration:'500ms',
      data: this.ELEMENT_DATA.filter( x => x.id === nro)

    })
    dialogRef.beforeClosed().subscribe( (result =>{
      if(result === true)
        this.getTranasctionDetails('','','','')

    }))
    
  }
  openDialogDelete(nro:number):void{
    const dialogRefDelete = this.dialog.open(DeleteDialogComponet,{
      width:'60%',
      enterAnimationDuration:'400ms',
      exitAnimationDuration:'500ms',
      data:nro
      

    })
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result === true)
        this.deleteTransaction(nro);
    });
  }

  getTranasctionDetails( dateStart:string='', dateEnd:string='',activiteType:string='',transactionType:string=''): void {
    let church: Church = JSON.parse(localStorage.getItem("church")!)
    this.ELEMENT_DATA = []
    this.transactionService.getTransactionDetails(church.id,dateStart,dateEnd,activiteType,transactionType)
      .subscribe(res => {

        if (!res) {
          Swal.fire('Error', 'Error inesperado', 'error')
          return
        }
        res.data.details.forEach(data => {
          let trElement: TransactionElement = {
            id: data.transactionId,
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
    this.dataSource = new MatTableDataSource<TransactionElement>(this.ELEMENT_DATA.slice(0,10))
    this.dataSource.paginator = this.paginator
  }

  filter(): void {
    const { transactionDateStart, transactionDateEnd, transactionActivite, transactionType } = this.transactionListForm.value;
    let startDate = '';
    let endDate = ''
    if(transactionDateStart) 
      startDate= formatDate(transactionDateStart,'yyyy-MM-dd', 'en-US')
    if(transactionDateEnd) 
      endDate = formatDate(transactionDateEnd,'yyyy-MM-dd', 'en-US')
    this.getTranasctionDetails(startDate ,endDate ,transactionActivite,transactionType);
  }

  getTypes(): void {
    if (this.transactionService.transactionTypes.length === 0) {
      this.transactionService.getTransactionTypes()
        .subscribe((res: TransactionTypePosResData) => {
          res.data.transactionTypes.forEach(tr => this.types.push(tr));
        }
      )
    }
    else{
      this.types = this.transactionService.transactionTypes;
    }
  }

  changeView(event:PageEvent):void{
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize
    if(endIndex > this.ELEMENT_DATA.length){
      endIndex = this.ELEMENT_DATA.length

    }
    this.dataSource.data = this.ELEMENT_DATA.slice(startIndex,endIndex)
  }

  clearTable():void{
    this.getTranasctionDetails('','','','');
    this.transactionListForm.reset();
  }

  deleteTransaction(nro:number):void{
    this.church = JSON.parse(localStorage.getItem("church") || '') 
    this.transactionService.deleteTransaction(nro,this.church.id).subscribe(
      res => {
        if(res){
          Swal.fire({
            icon: 'success',
            title: 'Movimiento eliminado exitosamente!',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false
           
        })
       
        this.getTranasctionDetails('','','','');

        }else{
            Swal.fire('Error', 'Error inesperado', 'error')
        } 
      } 
    )
    
  }

}
