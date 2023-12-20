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
  
  church!:Church;

  constructor(private dashboardService:DashboardService){}
  ngOnInit(): void {
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

  
  
  
}
