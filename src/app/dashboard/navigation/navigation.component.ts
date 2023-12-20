import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  public sidebarItems = [
    { label:'Agregar movimiento', icon: 'add_circle',url:'/transaction/add' },
    { label:'Listar movimientos', icon: 'list',url:'./transactions-list' },
    { label:'Inicio', icon: 'home',url:'/dashboard/home' }


  ]
  constructor(private router:Router){}

  
  logout():void{
    localStorage.clear()
    this.router.navigateByUrl("/auth")
  }  
}