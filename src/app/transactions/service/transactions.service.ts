import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environments } from "src/app/environments/environments";
import { Transaction, TransactionDetailGetResData, TransactionPostReqData, TransactionPostResData, TransactionType, TransactionTypePosResData } from "../interface/transaction.interface";

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

  getTransactionDetails(churchId: number, dateStart: string, dateEnd: string, activiteType: string, transactionType: string): Observable<TransactionDetailGetResData> {
    let params = new HttpParams()
      .set('churchId', churchId.toString())
      .set('startDate', dateStart)
      .set('endDate', dateEnd)
      .set('activiteType', activiteType)
      .set('transactionType', transactionType);
    return this.httpClient.get<TransactionDetailGetResData>(
      `${environments.icejasBaseUrl}/`, { params: params });
  }

}