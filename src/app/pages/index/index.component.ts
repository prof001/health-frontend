import {Component, OnInit, OnDestroy, TemplateRef} from '@angular/core';
import {DoctorModel} from '../../models/doctor.model';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AppointmentModel} from '../../models/appointment.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {HttpService} from '../../shared/http.service';

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  pagination = 3;
  doctor: DoctorModel = new DoctorModel();
  appointment: AppointmentModel = new AppointmentModel();
  showError = false;
  loginError;
  processing = false;
  datePickerConfig = {
    dateInputFormat: 'MM-DD-YYYY',
    isAnimated: true,
    containerClass: 'theme-red'
  };
  successChecker = false;
  appointmentMessage;

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    this.appointment.reason = 'diagnosis';

    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

  loginDoctor() {
    this.processing = true;
    this.authService.loginDoctor('health/login', this.doctor).subscribe(
      res => {
        this.processing = false;
        localStorage.setItem('x-access-token', res.token);
        localStorage.setItem('doctorId', String(res.doctorId));
        this.router.navigate(['/dashboard'])
      },
      err => {
        this.processing = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.showError = true;
            this.loginError = err.error.message;
          } else if (err.status === 0){
            this.showError = true;
            this.loginError = 'Oooops! A server error has occurred.';
          }
        }
        console.log(err);
      }
    );
  }

  bookAppointment() {
    this.processing = true;
    this.appointment.date = this.formatDate(this.appointment.date);
    this.httpService.bookAppointment('health/bookAppointment', this.appointment).subscribe(
      res => {
        this.successChecker = true;
        this.appointmentMessage = res.message;
        this.appointment = new AppointmentModel();
        this.processing = false;
      },
      err => {
        console.log(err);
        this.processing = false;
      }
    );
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  onAlertDismiss() {
    this.successChecker = false;
  }
}
