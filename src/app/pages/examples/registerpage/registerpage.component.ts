import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {HttpService} from '../../../shared/http.service';
import {DoctorModel} from '../../../models/doctor.model';
import {AuthService} from '../../../shared/auth.service';
import {Router} from '@angular/router';

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
  successChecker = false;
  processing = false;
  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  createDoctor() {
    this.processing = true;
    this.httpService.createDoctor('health/registerDoctor', this.doctor).subscribe(
      res => {
        this.successChecker = true;
        window.scrollTo(0, 0);
        this.processing = false;
        this.doctor = new DoctorModel();
      },
      err => {
        console.log(err);
      }
    )
  }

  onAlertDismiss() {
    this.successChecker = false;
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }
}
