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

  constructor(public auth:AuthServiceService){}

}
