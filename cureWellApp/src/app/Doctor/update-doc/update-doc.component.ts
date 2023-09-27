import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RestServiceService } from 'src/app/shared/rest-service.service';

@Component({
  selector: 'app-update-doc',
  templateUrl: './update-doc.component.html',
  styleUrls: ['./update-doc.component.css']
})
export class UpdateDocComponent {

  constructor(public objService: RestServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const doctorId = +params['id'];
      this.objService.getDoctorById(doctorId).subscribe((doctor) => {
        this.objService.dData = doctor; // Assuming this is how you set the form data
      });
    });
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
    this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.objService.editDoctorDetails().subscribe(res => {
      this.resetForm();
      this.objService.getDoctors();
      alert('Doctor Record updated!!!');
    },
      err => {
        alert('Error!!!' + err);
      })
  }
}
