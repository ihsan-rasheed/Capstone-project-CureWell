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

  getDoctorsBySpecializations(specialization: string) {
    const apiUrl = `${this.serv.apiUrl3}/GetDoctorsBySpecialization/${specialization}`;
    this.objHttp.get<Doctor[]>(apiUrl).toPromise().then(res => this.serv.dspecializationList = res as Doctor[]);
    this.router.navigate(["doctorSpecialization"]);
    this.serv.DoctorSpecializationName=specialization;

  }
  addSpecialization(){
    this.router.navigate(["add-specialization"]);
  }

}


