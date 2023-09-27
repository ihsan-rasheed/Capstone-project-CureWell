import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ViewDoctorComponent } from './components/Doctor/view-doctor/view-doctor.component';
import { authGuard } from './guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { UpdateDocComponent } from './Doctor/update-doc/update-doc.component';
import { ViewSpecializationComponent } from './view-specialization/view-specialization.component';
import { ViewTodaysSurgeryComponent } from './view-todays-surgery/view-todays-surgery.component';
import { UpdateSurgeryComponent } from './update-surgery/update-surgery.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ViewDoctorbyspecializationComponent } from './view-doctorbyspecialization/view-doctorbyspecialization.component';
import { AddSpecializationComponent } from './add-specialization/add-specialization.component';
import { AddSurgeryComponent } from './add-surgery/add-surgery.component';
import { AddDoctorinSpecializationComponent } from './add-doctorin-specialization/add-doctorin-specialization.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'doctor', component: ViewDoctorComponent ,canActivate:[authGuard]},
  {path:'updateDoc/:id',component:UpdateDocComponent,canActivate:[authGuard]},
  {path:'viewspecialization',component:ViewSpecializationComponent,canActivate:[authGuard]},
  {path:'viewtodayssurgery',component:ViewTodaysSurgeryComponent,canActivate:[authGuard]},
  {path:'updatesurgery/:id',component:UpdateSurgeryComponent,canActivate:[authGuard]},
  { path: 'add-doctor', component:AddDoctorComponent ,canActivate:[authGuard]},
  { path: 'add-surgery', component:AddSurgeryComponent ,canActivate:[authGuard]},
  { path: 'add-specialization', component:AddSpecializationComponent ,canActivate:[authGuard]},
  { path: 'add-doctor-specialization', component:AddDoctorinSpecializationComponent ,canActivate:[authGuard]},
  {path:'doctorSpecialization',component:ViewDoctorbyspecializationComponent,canActivate:[authGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
