import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/AuthLogin';
import { DashboardService } from '../service/dashboard.service';
import { Church } from 'src/app/transactions/interface/church.interface';
import { TransactionReportGetResData } from 'src/app/transactions/interface/transaction.interface';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  user:User = {
    id:0,
    document:'',
    lastName:'',
    name:'',
    role:''
  };

  church:Church ={
    currentBalance :0,
    created:'',
    id:0,
    name:''
};
  
  
  
  public finishedGetReport:boolean = false;
  public isFinishedGetChurch:boolean = false;
  constructor(private dashboardService:DashboardService){
   

  }
  ngOnInit(): void {
    this.getUser();
    forkJoin({
      church: this.dashboardService.getChurch(),
      report: this.dashboardService.getReport(),
    }).subscribe(({ church, report }) => {
      if (church) {
        this.church = church;
        localStorage.setItem("church",JSON.stringify(this.church))
        this.isFinishedGetChurch = true;
      }
      if (report) 
        this.finishedGetReport = true;
      
    });
    
  }
  getUser():void{
    const user = localStorage.getItem('user') || '';
    let userStr:User = JSON.parse(user);
    this.user = userStr;
  }


  
  


  
  
}
