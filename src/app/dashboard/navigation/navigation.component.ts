import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ADMIN_ROLE } from 'src/app/constants/icejas-constants';
import { User } from 'src/app/auth/models/AuthLogin';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  public sidebarItems = [
    { label:'Listar ', icon: 'list',url:'/transaction/list' }
  
  ]

  public sidebarItemsReport = [
    { label:'Movimientos', icon:'receipt_long',url:'/reports/balance' },
    { label:'Resumen', icon:'monitoring',url:'/dashboard/resume' }
  ]
  public home = { label:'Inicio', icon: 'home',url:'/dashboard/home' }
  
  constructor(private router:Router){}
  ngOnInit(): void {
    const user:User =  JSON.parse(localStorage.getItem("user")!);
    if( user.role === ADMIN_ROLE)
      this.sidebarItems.unshift({ label:'Agregar ', icon: 'add_circle',url:'/transaction/add' })
  }

  toggle = []
  logout():void{
    localStorage.clear()
    this.router.navigateByUrl("/auth")
  }  
}
