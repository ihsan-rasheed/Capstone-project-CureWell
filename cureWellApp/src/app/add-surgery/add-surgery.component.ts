import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestServiceService } from '../shared/rest-service.service';

@Component({
  selector: 'app-add-surgery',
  templateUrl: './add-surgery.component.html',
  styleUrls: ['./add-surgery.component.css']
})
export class AddSurgeryComponent implements OnInit{
  constructor(public objService: RestServiceService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    } else {
      this.objService.SurgeryData = { SurgeryId: 0, DoctorId:0,SurgeryDate:null,StartTime:0,EndTime:0,SurgeryCategory:'' };
    }
  }

  onSubmit(form: NgForm) {
      this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.objService.addSurgery().subscribe(
      (res) => {
        this.resetForm(form);

        this.objService.getAllSurgery();

        alert('Surgery Successfully Added!!');
      },

      (err) => {
        alert('Error!!' + err);
      }
    );
  }
}
