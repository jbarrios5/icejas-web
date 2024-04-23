import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/dashboard/service/dashboard.service";
import { Church } from "src/app/transactions/interface/church.interface";

@Component({
    selector: 'layout-home-page',
    templateUrl: './layout.component.html',
    styleUrls:['./layout.component.css']
  })
export class LayoutHomeComponent implements OnInit{
    church:Church ={
        currentBalance :0,
        created:'',
        id:0,
        name:''
    };
    constructor(private dashboardService:DashboardService) {
    }
    ngOnInit(): void {
        this.getChurch()
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