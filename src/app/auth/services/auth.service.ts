import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthPostReq, AuthPostReqData, AuthPostRes, AuthPostResData, User } from '../models/AuthLogin';
import { environments } from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public  authUser:User ={id:0,name:'',document:'',lastName:'',role:''};
  constructor(private httpClient:HttpClient) { }
  public accessToken:string = '';
  login(request:AuthPostReqData):Observable<AuthPostResData | undefined>{
    const URL = `${environments.authBaseUrl}/login`;
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'apiKey': "icejas-088cad7b-7a3b-4a04-b0c5-f4b0796e5b89",
        
      }
    )
    request.data.password = btoa(request.data.password)
    return this.httpClient.post<AuthPostResData>(URL,request,{headers:headers})
    .pipe(
      tap(
        res =>{ 
          this.accessToken = res.data.login.accessToken
          this.authUser = res.data.user;
        }
      )
    )
    
    
  }
}
