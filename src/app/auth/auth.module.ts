import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing.module';

const routes: Routes = [];

@NgModule({
  imports: [AuthRoutingModule],
  declarations:[AuthComponent]
})
export class AuthModule { }
