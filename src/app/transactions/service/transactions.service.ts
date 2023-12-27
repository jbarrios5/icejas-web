import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environments } from "src/app/environments/environments";
import { Transaction, TransactionDetailGetResData, TransactionPostReqData, TransactionPostResData, TransactionType, TransactionTypePosResData } from "../interface/transaction.interface";

@Injectable({
    providedIn: 'root'
  })
export class TransactionService{
    constructor(private httpClient:HttpClient){}
    
    getTransactionTypes():Observable<TransactionTypePosResData>{
        return this.httpClient.get<TransactionTypePosResData>(`${environments.icejasBaseUrl}/types`)
    }

    addTransaction(transactionPostReqData:TransactionPostReqData):Observable<TransactionPostResData>{
        const header = new HttpHeaders(
            {
              'Content-Type': 'application/json'
           
            }
          )
        return this.httpClient.post<TransactionPostResData>(`${environments.icejasBaseUrl}/`,transactionPostReqData,{headers:header})
    }

    getTransactionDetails(churchId:number):Observable<TransactionDetailGetResData>{
      return this.httpClient.get<TransactionDetailGetResData>(`${environments.icejasBaseUrl}/?church_id=${churchId}`);
    }

}