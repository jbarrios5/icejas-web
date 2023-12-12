import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AuthRoutingModule } from './auth.routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [];

@NgModule({
  imports: [AuthRoutingModule,MaterialModule],
  declarations:[LoginComponent,LayoutComponent]
})
export class AuthModule { }
