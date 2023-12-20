import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Church } from 'src/app/transactions/interface/church.interface';
import { environments } from 'src/app/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient:HttpClient) { }

  getChurch():Observable<Church>{
    return this.httpClient.get<Church>(environments.icejasBaseUrl);
  }
  
    
    
  }