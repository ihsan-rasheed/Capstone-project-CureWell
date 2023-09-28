import { Component, OnInit } from '@angular/core';
import { RestServiceService } from 'src/app/shared/rest-service.service';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {
  constructor(public serv: RestServiceService) { }

  ngOnInit(): void {
    this.serv.getDoctors();
  }


  delDoctor(id) {

    if (confirm('Are you sure to delete this Doctor?')) {
      this.serv.deleteDoctor(id).subscribe(res => {
        this.serv.getDoctors();
        alert('Doctor Removed');
      },
        err => {
          alert("Error!!" + err);
        });
    }
  }
}
