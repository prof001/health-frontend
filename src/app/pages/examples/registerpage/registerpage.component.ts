import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {HttpService} from '../../../shared/http.service';
import {DoctorModel} from '../../../models/doctor.model';

@Component({
  selector: 'app-registerpage',
  templateUrl: 'registerpage.component.html'
})
export class RegisterpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  doctor: DoctorModel = new DoctorModel();
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
  }

  getDoctors() {
    this.httpService.getDoctors('health/doctors').subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  createDoctor() {
    this.httpService.createDoctor('health/registerDoctor', this.doctor).subscribe(
      res => {
        console.log();
      },
      err => {
        console.log(err);
      }
    )
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }
}
