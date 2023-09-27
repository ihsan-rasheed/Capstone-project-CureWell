import { Component } from '@angular/core';
import { RestServiceService } from '../shared/rest-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-surgery',
  templateUrl: './update-surgery.component.html',
  styleUrls: ['./update-surgery.component.css'],
})
export class UpdateSurgeryComponent {
  constructor(
    public objService: RestServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const surgeryId = +params['id'];

      this.objService.getSurgeryById(surgeryId).subscribe((surgery) => {
        this.objService.SurgeryData = surgery; // Assuming this is how you set the form data
      });
    });

    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
  }

  onSubmit(form: NgForm) {
    this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.objService.editSurgeryTime().subscribe(
      (res) => {
        this.resetForm();

        this.objService.getTodaySurgery();

        alert('Surgery Details Updated!!!');
      },

      (err) => {
        alert('Error!!!' + err);
      }
    );
  }
}
