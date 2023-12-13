import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {AuthPostReqData,AuthPostReq,AuthPostResData} from "../../models/AuthLogin"
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'login-page',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  


  constructor(private authService:AuthService){}


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
    console.log(this.req);
    
    this.authService.login(this.req)
    .subscribe( data => console.log(data)
    )
    
    
  }

}