import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/AuthLogin';
import { DashboardService } from '../service/dashboard.service';
import { Church } from 'src/app/transactions/interface/church.interface';

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
  public totalDebitMonth:number = 0;
  public totalCreditMonth:number = 0;
  public finishedGetReport:boolean = false;
  constructor(private dashboardService:DashboardService){}
  ngOnInit(): void {
    this.getReport();
    this.getUser();
    this.getChurch();
    

  }

  
    
  getUser():void{
    const user = localStorage.getItem('user') || '';
    let userStr:User = JSON.parse(user);
    this.user = userStr;
  }

  getChurch():void{
    this.dashboardService.getChurch().subscribe(
      (res:Church) => {
        this.church= res
        localStorage.setItem("church",JSON.stringify(this.church))
      }
    )
  }

  getReport():void{
    console.log("antes de obtener reportes",this.finishedGetReport);
    
    this.dashboardService.getReport().subscribe
    (
      (res)=>{
        console.log(res);
        
        if(!res)
          this.finishedGetReport =false
        else{
          this.finishedGetReport = true;  
          this.totalCreditMonth = res.data.at(-1)!.totalCredit ;
          this.totalDebitMonth = res.data.at(-1)!.totalDebit ;
        }
          console.log("despuesde obtener reportes",this.finishedGetReport);
      }
    )
  }
  
  
}
