import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthPostReqData, AuthPostResData } from '../models/AuthLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  login(request:AuthPostReqData):Observable<AuthPostResData | undefined>{
    
    return this.httpClient.post<AuthPostResData>("",request)
    .pipe(
      tap((data:AuthPostResData) => {
          
          console.log(data);
          
      })
      ,
      catchError( (err,caught) => {
          console.warn(`Hay une error `,err)
          return of(undefined)
      })
      )
  }
}
