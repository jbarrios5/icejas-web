import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { retry } from "rxjs";
import {AuthPostReqData,AuthPostReq,AuthPostResData} from "../../models/AuthLogin"
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'login-page',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  


  constructor(private authService:AuthService,private route:Router){}

  hasError:boolean = false;
  errorMessage:string = ''
  reqData:AuthPostReq = {document:'',password:''};
  req:AuthPostReqData = {data:this.reqData}

  public authForm = new FormGroup({
    document: new FormControl('',{nonNullable:true}),
    password: new FormControl('',{nonNullable:true})
  })



  public login():void{
    
    if(!this.authForm.valid)
      return 
    
    const formValue = this.authForm.value;
    
    this.req.data.document = formValue.document ? formValue.document: ''
    this.req.data.password = formValue.password ? formValue.password: ''
    
    this.authService.login(this.req)
    .subscribe( response =>{
      if(!response){
        this.route.navigateByUrl("/auth")
        this.hasError = true;
        this.errorMessage = "Ocurrio un error al intentar acceder";
        return;
      }
        
      this.addLocalStorage("accessToken",response!.data.login.accessToken)
      this.addLocalStorage("user",JSON.stringify(response!.data.user) )
      this.route.navigateByUrl("/dashboard")

    }
    )
    
    
  }

  addLocalStorage(key:string,value:string){
     localStorage.setItem(key,value);
     if(!localStorage.getItem(key))
      throw new Error("Error al guardar datos");
     else
      return; 
      
  }

}