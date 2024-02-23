import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap,of,catchError } from "rxjs";
import { environments } from "src/app/environments/environments";
import { Transaction, TransactionDeleteResData, TransactionDetailGetResData, TransactionPostReqData, TransactionPostResData, TransactionPutResData, TransactionType, TransactionTypePosResData } from "../interface/transaction.interface";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public transactionTypes: TransactionType[] = []

  constructor(private httpClient: HttpClient) { }

  getTransactionTypes(): Observable<TransactionTypePosResData> {
    return this.httpClient.get<TransactionTypePosResData>(`${environments.icejasBaseUrl}/types`)
      .pipe(
        tap(res => this.transactionTypes = res.data.transactionTypes)
      )
  }

  addTransaction(transactionPostReqData: TransactionPostReqData): Observable<TransactionPostResData> {
    const header = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
    return this.httpClient.post<TransactionPostResData>(`${environments.icejasBaseUrl}/`, transactionPostReqData, { headers: header })
  }

  getTransactionDetails(churchId: number, dateStart: string|null, dateEnd: string|null, activiteType: string, transactionType: string): Observable<TransactionDetailGetResData> {
      
      debugger;

    return this.httpClient.get<TransactionDetailGetResData>(
      `${environments.icejasBaseUrl}/?churchId=${churchId}&startDate=${dateStart}&endDate=${dateEnd}&activiteType=${activiteType}&transactionType=${transactionType}`);
  }

  updateTransaction(req:TransactionPostReqData):Observable<boolean>{
    return this.httpClient.put<TransactionPutResData>( `${environments.icejasBaseUrl}/`,req)
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
    return this.httpClient.delete<TransactionDeleteResData>( `${environments.icejasBaseUrl}/?transactionId=${nro}&churchId=${churchId}`)
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