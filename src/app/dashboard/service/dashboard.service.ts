import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Church } from 'src/app/transactions/interface/church.interface';
import { environments } from 'src/app/environments/environments';
import { TransactionReportGetResData } from 'src/app/transactions/interface/transaction.interface';
import { AuthService } from 'src/app/auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public transactionReportGetResData!:TransactionReportGetResData
  public totalDebitMonth:number       = 0;
  public totalCrediMonth:number       = 0;
  public churchCurrentBalance: number = 0;

  constructor(private httpClient:HttpClient,private authService:AuthService) { }

  getChurch():Observable<Church>{
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'apiKey': "icejas-088cad7b-7a3b-4a04-b0c5-f4b0796e5b89",
        'Authorization':'Bearer '+ localStorage.getItem("accessToken")
        
      }
    )
    return this.httpClient.get<Church>(`${environments.icejasBaseUrl}/church?church_id=1`,{headers:headers})
    .pipe(
      tap( res => this.churchCurrentBalance = res.currentBalance)
    );
  }
  
  getReport():Observable<TransactionReportGetResData>{
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'apiKey': "icejas-088cad7b-7a3b-4a04-b0c5-f4b0796e5b89",
        'Authorization':'Bearer '+ localStorage.getItem("accessToken")
        
      }
    )
    return this.httpClient.get<TransactionReportGetResData>(`${environments.icejasBaseUrl}/report?churchId=1`,{headers:headers})
    .pipe(
      tap( res =>{
        if(res.data){
            this.transactionReportGetResData = res;
            this.totalCrediMonth = res.data.at(-1)!.totalCredit;
            this.totalDebitMonth = res.data.at(-1)!.totalDebit;
          }
      })
    );
  }
    
    
  }