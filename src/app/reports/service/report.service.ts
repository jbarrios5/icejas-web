import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { API_KEY } from "src/app/constants/icejas-constants";
import { environments } from "src/app/environments/environments";
import { MonthSummaryGetResData } from "../interface/reports.interface";

@Injectable({
    providedIn: 'root'
  })
export class ReportService {

    constructor(private authService:AuthService,private httpClient: HttpClient){}

    getSummaryMonth(startMonth:string,endMonth:string):Observable<MonthSummaryGetResData>{
        const headers = new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'apiKey': API_KEY,
              'Authorization':'Bearer '+ this.authService.accessToken
            }
        )
        
        return this.httpClient.get<MonthSummaryGetResData>(`${environments.icejasBaseUrl}/summary?startDate=${startMonth}&endDate=${endMonth}&churchId=1`,{ headers: headers })
        

    }
    


}