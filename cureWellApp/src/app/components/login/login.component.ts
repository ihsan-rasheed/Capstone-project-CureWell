import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { Admin } from 'src/app/_interface/admin.model';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { ResponseToken } from 'src/app/_interface/response-token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http:HttpClient,private router:Router,private auth:AuthServiceService){}


  invalidLogin:boolean
  credentials:Admin = {userName:'',Password:''}

  login(form:NgForm)  {
    if(form.valid){
      this.http.post<ResponseToken>("http://localhost:5075/api/Auth/login",this.credentials,{
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (res:ResponseToken) => {
          const token = res;
          localStorage.setItem('jwt', token.Token); 
          this.invalidLogin=false;
          this.router.navigate(["doctor"]);

          const tokenstring = localStorage.getItem('jwt');
console.log('Token:', tokenstring);

        },
        error:  (err: HttpErrorResponse) => this.invalidLogin = true
      })
      
    }
  }
}
