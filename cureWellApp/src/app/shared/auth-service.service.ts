import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../_interface/admin.model';
import { NgForm } from '@angular/forms';
import { ResponseToken } from '../_interface/response-token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient,private router:Router) { }


  // storeToken(tokenValue:string){
  //   localStorage.setItem('token',tokenValue);
  // }

  // getToken(){
  //   localStorage.getItem('token');
  // }

  // isLoggedIn():boolean{
  //   return !! localStorage.getItem('token');
  // }

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

//           const tokenstring = localStorage.getItem('jwt');
// console.log('Token:', tokenstring);

        },
        error:  (err: HttpErrorResponse) => this.invalidLogin = true
      })
      
    }
  }

}
