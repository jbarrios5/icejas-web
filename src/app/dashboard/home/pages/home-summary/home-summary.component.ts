import { Component } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/service/dashboard.service';

@Component({
  selector: 'app-home-summary',
  templateUrl: './home-summary.component.html',
  styleUrls: ['./home-summary.component.css']
})
export class HomeSummaryComponent {
  totalDebitMonth:number  = 0;
  totalCreditMonth:number = 0;
  currentBalance:number   = 0;
  
  
  constructor(private dashboardService:DashboardService){
    console.log('En el constructor');
    const obj = JSON.parse(localStorage.getItem('church')!);
    this.currentBalance = obj.currentBalance
    this.totalCreditMonth = this.dashboardService.totalCrediMonth;
    this.totalDebitMonth = this.dashboardService.totalDebitMonth;

  }
  

}
