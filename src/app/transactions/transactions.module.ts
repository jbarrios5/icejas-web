import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionRouting } from './transaction-routing.module';
import { ListTransactionComponent } from './pages/list-transaction/list-transaction.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DialogModule } from '../dialog/dialog.module';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [TransactionsComponent, ListTransactionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TransactionRouting,
    ReactiveFormsModule,
    DialogModule

  ],
  providers: [DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    // Configura aquí el locale si es necesario
    { provide: MAT_DATE_LOCALE, useValue: 'es' },]
})
export class TransactionsModule { }
