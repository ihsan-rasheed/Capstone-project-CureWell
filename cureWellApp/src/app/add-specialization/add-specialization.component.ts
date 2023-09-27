import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestServiceService } from '../shared/rest-service.service';

@Component({
  selector: 'app-add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.css'],
})
export class AddSpecializationComponent implements OnInit {
  constructor(public objService: RestServiceService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    } else {
      this.objService.sData = {
        SpecializationCode: '',
        SpecializationName: '',
      };
    }
  }

  insertRecord(form: NgForm) {
    this.objService.addSpecialization().subscribe(
      (res) => {
        this.resetForm(form);

        this.objService.specialization_List();

        alert('Specialization Successfully Added!!');
      },

      (err) => {
        alert('Error!!' + err);
      }
    );
  }
}
