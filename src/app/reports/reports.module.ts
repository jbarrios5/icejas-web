import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BalanceReporComponent } from "./pages/balance/balance.component";
import { ReportRouting } from './reports-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations:[BalanceReporComponent],
    imports:[
        CommonModule,
        ReportRouting,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers:[]

})
export class ReportModule {}