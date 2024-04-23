import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgChartsModule } from "ng2-charts";
import { MaterialModule } from "../material/material.module";
import { DashboardRouting } from "./dashboard.routing.module";
import { HomeComponent } from "./home/home.component";
import { GraphComponent } from "./home/pages/graph/graph.component";
import { HomeSummaryComponent } from "./home/pages/home-summary/home-summary.component";
import { LayoutHomeComponent } from "./home/pages/layout/layout.component";
import { NavigationComponent } from "./navigation/navigation.component";

@NgModule({
    imports: [DashboardRouting,MaterialModule,CommonModule,ReactiveFormsModule,RouterModule,NgChartsModule],
    declarations:[NavigationComponent,HomeComponent,GraphComponent,LayoutHomeComponent,HomeSummaryComponent]
  })
export class DashboardModule{}