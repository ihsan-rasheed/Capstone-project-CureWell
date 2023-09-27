import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewDoctorComponent } from './components/Doctor/view-doctor/view-doctor.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { authGuard } from './guards/auth.guard';
import { UpdateDocComponent } from './Doctor/update-doc/update-doc.component';
import { ViewSpecializationComponent } from './view-specialization/view-specialization.component';
import { ViewTodaysSurgeryComponent } from './view-todays-surgery/view-todays-surgery.component';
import { UpdateSurgeryComponent } from './update-surgery/update-surgery.component';

import { NavComponent } from './nav/nav.component';
import { ViewDoctorbyspecializationComponent } from './view-doctorbyspecialization/view-doctorbyspecialization.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { AddSurgeryComponent } from './add-surgery/add-surgery.component';
import { AddSpecializationComponent } from './add-specialization/add-specialization.component';
import { AddDoctorinSpecializationComponent } from './add-doctorin-specialization/add-doctorin-specialization.component';

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewDoctorComponent,
    UpdateDocComponent,
    ViewSpecializationComponent,
    ViewTodaysSurgeryComponent,
    UpdateSurgeryComponent,
    AddDoctorComponent,
    NavComponent,
    ViewDoctorbyspecializationComponent,
    AddSurgeryComponent,
    AddSpecializationComponent,
    AddDoctorinSpecializationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
