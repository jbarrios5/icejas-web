import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LayoutHomeComponent } from "./home/pages/layout/layout.component";
import { NavigationComponent } from "./navigation/navigation.component";

const routes: Routes = [
    {
        path:'',
        component:NavigationComponent,
        children:[
            {path:'home',component:LayoutHomeComponent},
            {path:'resume',component:HomeComponent},
            {path:'**',redirectTo:'home'},
        ]

    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class DashboardRouting{}