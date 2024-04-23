import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/AuthLogin';
import { DashboardService } from '../service/dashboard.service';
import { Church } from 'src/app/transactions/interface/church.interface';
import { TransactionReportGetResData } from 'src/app/transactions/interface/transaction.interface';

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
  
  
  
  public finishedGetReport:boolean = false;
  constructor(private dashboardService:DashboardService){
   

  }
  ngOnInit(): void {
    this.getUser();
    this.getReport();
  }
  getUser():void{
    const user = localStorage.getItem('user') || '';
    let userStr:User = JSON.parse(user);
    this.user = userStr;
  }


  getReport():void{
    this.dashboardService.getReport().subscribe
    (
      (res)=>{
        if(!res)
          this.finishedGetReport =false
        else{
          this.finishedGetReport = true;  
        }
      }
      
    )
  }


  
  
}
