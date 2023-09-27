import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestServiceService } from '../shared/rest-service.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
})
export class AddDoctorComponent implements OnInit {
  constructor(public objService: RestServiceService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    } else {
      this.objService.dData = { DoctorId: 0, DoctorName: '' };
    }
  }

  onSubmit(form: NgForm) {
    if (this.objService.dData.DoctorId == 0) {
      this.insertRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.objService.addDoctor().subscribe(
      (res) => {
        this.resetForm(form);

        this.objService.getDoctors();

        alert('Doctor Successfully Added!!');
      },

      (err) => {
        alert('Error!!' + err);
      }
    );
  }
}
