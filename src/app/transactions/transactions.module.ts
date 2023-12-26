import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionRouting } from './transaction-routing.module';



@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TransactionRouting,
    ReactiveFormsModule

  ],
  providers: [DatePipe]
})
export class TransactionsModule { }
