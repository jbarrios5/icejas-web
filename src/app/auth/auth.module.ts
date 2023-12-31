import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AuthRoutingModule } from './auth.routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  imports: [AuthRoutingModule,MaterialModule,CommonModule,ReactiveFormsModule],
  declarations:[LoginComponent,LayoutComponent]
})
export class AuthModule { }
