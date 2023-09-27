import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http'
import { Doctor } from './doctor';
import { Observable } from 'rxjs/internal/Observable';
import { Specialization } from './specialization.model';
import { Surgery } from './surgery.model';
import { DoctorSpecialization } from './doctor-specialization.model';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private objHttp:HttpClient) { }

  dData:Doctor=new Doctor();
  sData:Specialization=new Specialization();
  SurgeryData:Surgery=new Surgery();
  dSpecializationData:DoctorSpecialization=new DoctorSpecialization();
  

  readonly apiUrl='http://localhost:5075/api/Doctors';
  readonly apiUrl2='http://localhost:5075/api/specializations';
  readonly apiUrl3='http://localhost:5075/api/doctorspecializations';
  readonly apiUrl4='http://localhost:5075/api/Surgeries';
  readonly apiUrl5='http://localhost:5075/api/Surgeries/GetAllSurgeries';


  dList:Doctor[];
  specializationList:Specialization[];
  surgeryList:Surgery[];
  AllsurgeryList:Surgery[];
  dspecializationList:Doctor[];
  DoctorSpecializationName:string;
  dSpecializationList:DoctorSpecialization[];
  

  addDoctor()
  {
    return this.objHttp.post(this.apiUrl,this.dData);
  }

  editDoctorDetails()
  {
    return this.objHttp.put(this.apiUrl+'/'+this.dData.DoctorId,this.dData);
  }

  deleteDoctor(id)
  {
    return this.objHttp.delete(this.apiUrl+'/'+id);
  }

  getDoctors(){
    this.objHttp.get(this.apiUrl).toPromise().then(res=>this.dList=res as Doctor[]);
  }

  getDoctorById(id:number):Observable<any>{
    return this.objHttp.get<any>(this.apiUrl+'/'+id);
  }

  specialization_List()
  {
    this.objHttp.get(this.apiUrl2).toPromise().then(res=>this.specializationList=res as Specialization[]);
  }

  addSpecialization()
  {
    return this.objHttp.post(this.apiUrl2,this.sData);
  }

  getTodaySurgery()
  {
    return this.objHttp.get(this.apiUrl4).toPromise().then(res=>this.surgeryList=res as Surgery[]);
  }
  addSurgery()
  {
    return this.objHttp.post(this.apiUrl4,this.SurgeryData);
  }

  editSurgeryTime()
  {
    return this.objHttp.put(this.apiUrl4+'/'+this.SurgeryData.SurgeryId,this.SurgeryData);
  }

  getSurgeryById(id:number):Observable<any>
  {
    return this.objHttp.get<any>(this.apiUrl4+'/'+id);
  }

  getAllSurgery(){
    this.objHttp.get(this.apiUrl5).toPromise().then(res=>this.AllsurgeryList=res as Surgery[]);
  }
  addDoctorSpecialization(){

    return this.objHttp.post(this.apiUrl3,this.dSpecializationData)

  }
  DoctorSpecializationList(){

    this.objHttp.get(this.apiUrl3).toPromise().then(res=>this.dSpecializationList=res as DoctorSpecialization[])

  }

}
