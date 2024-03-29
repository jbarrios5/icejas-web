import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthPostReqData, AuthPostResData } from '../models/AuthLogin';
import { environments } from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  login(request:AuthPostReqData):Observable<AuthPostResData | undefined>{
    const URL = `${environments.authBaseUrl}/login`;
    const header = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'api_key': "apke"
      }
    )
    return this.httpClient.post<AuthPostResData>(URL,request,{headers:header})
    
    
  }
}