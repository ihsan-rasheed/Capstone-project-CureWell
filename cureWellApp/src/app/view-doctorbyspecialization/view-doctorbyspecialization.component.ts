import { Component } from '@angular/core';
import { RestServiceService } from '../shared/rest-service.service';

@Component({
  selector: 'app-view-doctorbyspecialization',
  templateUrl: './view-doctorbyspecialization.component.html',
  styleUrls: ['./view-doctorbyspecialization.component.css']
})
export class ViewDoctorbyspecializationComponent {
  constructor(public serv:RestServiceService){}

}
