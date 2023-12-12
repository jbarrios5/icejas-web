import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";


@Component({
  selector: 'login-page',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public authForm = new FormGroup({
    document: new FormControl('',{nonNullable:true}),
    password: new FormControl('',{nonNullable:true})
  })

  login():void{
    
    console.log(this.authForm.value);
    
    
    
  }

}