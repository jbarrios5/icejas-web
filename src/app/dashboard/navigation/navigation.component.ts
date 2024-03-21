import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ADMIN_ROLE } from 'src/app/constants/icejas-constants';

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
    { label:'Movimientos', icon:'receipt_long',url:'/reports/balance' }
  ]
  public home = { label:'Inicio', icon: 'home',url:'/dashboard/home' }
  
  constructor(private router:Router,private authService:AuthService){}
  ngOnInit(): void {
    
    if(this.authService.authUser.role === ADMIN_ROLE)
      this.sidebarItems.unshift({ label:'Agregar ', icon: 'add_circle',url:'/transaction/add' })
  }

  toggle = []
  logout():void{
    localStorage.clear()
    this.router.navigateByUrl("/auth")
  }  
}
