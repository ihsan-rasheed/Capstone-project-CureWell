import { Component } from '@angular/core';
import { RestServiceService } from '../shared/rest-service.service';

@Component({
  selector: 'app-view-todays-surgery',
  templateUrl: './view-todays-surgery.component.html',
  styleUrls: ['./view-todays-surgery.component.css']
})
export class ViewTodaysSurgeryComponent {
  constructor(public serv:RestServiceService){}
  ngOnInit(): void {
    this.serv.getTodaySurgery();
}
}
