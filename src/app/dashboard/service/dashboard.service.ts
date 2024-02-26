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


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public transactionReportGetResData!:TransactionReportGetResData


  constructor(private httpClient:HttpClient) { }

  getChurch():Observable<Church>{
    return this.httpClient.get<Church>(`${environments.icejasBaseUrl}/church?church_id=1`);
  }
  
  getReport():Observable<TransactionReportGetResData>{
    return this.httpClient.get<TransactionReportGetResData>(`${environments.icejasBaseUrl}/report?churchId=1`)
    .pipe(
      tap( res =>{
        if(res.data)
            this.transactionReportGetResData = res;
      })
    );
  }
    
    
  }