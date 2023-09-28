import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../shared/rest-service.service';
import { Doctor } from '../shared/doctor';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-specialization',
  templateUrl: './view-specialization.component.html',
  styleUrls: ['./view-specialization.component.css']
})
export class ViewSpecializationComponent implements OnInit {
  displayedDoctors: Doctor[] = [];
  constructor(public serv: RestServiceService,public objHttp:HttpClient,public router:Router) { }
  ngOnInit(): void {
    this.serv.specialization_List();
  }

  
  addSpecialization(){
    this.router.navigate(["add-specialization"]);
  }

}


