import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { DashboardRouting } from "./dashboard.routing.module";
import { HomeComponent } from "./home/home.component";
import { NavigationComponent } from "./navigation/navigation.component";

@NgModule({
    imports: [DashboardRouting,MaterialModule,CommonModule,ReactiveFormsModule],
    declarations:[NavigationComponent,HomeComponent]
  })
export class DashboardModule{}