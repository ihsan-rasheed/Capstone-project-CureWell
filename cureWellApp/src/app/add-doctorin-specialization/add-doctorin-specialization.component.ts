import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestServiceService } from '../shared/rest-service.service';

@Component({
  selector: 'app-add-doctorin-specialization',
  templateUrl: './add-doctorin-specialization.component.html',
  styleUrls: ['./add-doctorin-specialization.component.css'],
})
export class AddDoctorinSpecializationComponent implements OnInit {
  constructor(public objService: RestServiceService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    } else {
      this.objService.dSpecializationData = {
        DoctorId: 0,
        SpecializationCode: this.objService.DoctorSpecializationName,
        Specialization: null,
      };
    }
  }

  insertRecord(form: NgForm) {
    this.objService.addDoctorSpecialization().subscribe(
      (res) => {
        this.resetForm(form);

        this.objService.DoctorSpecializationList();
        alert('Doctor Specialization Successfully Added!!');
      },

      (err) => {
        alert('Error!!' + err);
      }
    );
  }
}
