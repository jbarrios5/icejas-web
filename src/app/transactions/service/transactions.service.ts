import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap,of,catchError } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { environments } from "src/app/environments/environments";
import { Transaction, TransactionDeleteResData, TransactionDetailGetResData, TransactionPostReqData, TransactionPostResData, TransactionPutResData, TransactionType, TransactionTypePosResData } from "../interface/transaction.interface";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public transactionTypes: TransactionType[] = []

  constructor(private httpClient: HttpClient,private authService:AuthService) { }

  getTransactionTypes(): Observable<TransactionTypePosResData> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'apiKey': "icejas-088cad7b-7a3b-4a04-b0c5-f4b0796e5b89",
        'Authorization':'Bearer '+ this.authService.accessToken
        
      }
    )
    return this.httpClient.get<TransactionTypePosResData>(`${environments.icejasBaseUrl}/types`,{headers:headers})
      .pipe(
        tap(res => this.transactionTypes = res.data.transactionTypes)
      )
  }

  addTransaction(transactionPostReqData: TransactionPostReqData): Observable<TransactionPostResData> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'apiKey': "icejas-088cad7b-7a3b-4a04-b0c5-f4b0796e5b89",
        'Authorization':'Bearer '+ this.authService.accessToken
        
      }
    )
    return this.httpClient.post<TransactionPostResData>(`${environments.icejasBaseUrl}/`, transactionPostReqData, { headers: headers })
  }

  getTransactionDetails(churchId: number, dateStart: string|null, dateEnd: string|null, activiteType: string, transactionType: string): Observable<TransactionDetailGetResData> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'apiKey': "icejas-088cad7b-7a3b-4a04-b0c5-f4b0796e5b89",
        'Authorization':'Bearer '+ this.authService.accessToken
        
      }
    )

    return this.httpClient.get<TransactionDetailGetResData>(
      `${environments.icejasBaseUrl}/?churchId=${churchId}&startDate=${dateStart}&endDate=${dateEnd}&activiteType=${activiteType}&transactionType=${transactionType}`,{headers:headers});
  }

  updateTransaction(req:TransactionPostReqData):Observable<boolean>{
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'apiKey': "icejas-088cad7b-7a3b-4a04-b0c5-f4b0796e5b89",
        'Authorization':'Bearer '+ this.authService.accessToken
        
      }
    )
    return this.httpClient.put<TransactionPutResData>( `${environments.icejasBaseUrl}/`,req,{headers:headers})
    .pipe(
      map( res => {
        if(res.data)
          return true
        else
          return false 
      }),
      catchError( (error) =>  {
        console.warn(error)
        
        return of(false)})
    )
  }
  deleteTransaction(nro:number,churchId:number):Observable<boolean>{
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'apiKey': "icejas-088cad7b-7a3b-4a04-b0c5-f4b0796e5b89",
        'Authorization':'Bearer '+ this.authService.accessToken
        
      }
    )
    return this.httpClient.delete<TransactionDeleteResData>( `${environments.icejasBaseUrl}/?transactionId=${nro}&churchId=${churchId}`,{headers:headers})
    .pipe(
      map( res => {
        if(res.data)
          return true
        else
          return false 
      }),
      catchError( (error) =>  {
        console.warn(error)
        
        return of(false)})
    )
  }

}