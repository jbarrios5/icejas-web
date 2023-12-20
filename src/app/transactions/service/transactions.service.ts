import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environments } from "src/app/environments/environments";
import { TransactionTypePosResData } from "../interface/transaction.interface";

@Injectable({
    providedIn: 'root'
  })
export class TransactionService{
    constructor(private httpClient:HttpClient){}
    
    getTransactionTypes():Observable<TransactionTypePosResData>{
        return this.httpClient.get<TransactionTypePosResData>(`${environments.icejasBaseUrl}/types`)
    }


}