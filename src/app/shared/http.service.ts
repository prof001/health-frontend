import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppointmentModel} from '../models/appointment.model';
import {DoctorModel} from '../models/doctor.model';
import {AppointmentReportModel} from '../models/appointment.report.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'https://health4everyone.herokuapp.com/api/v1';
  constructor(private http: HttpClient) {}

  createDoctor(path: string, doctorDetail) {
    return this.http.post(`${this.baseUrl}/${path}`, doctorDetail);
  }

  bookAppointment(path: string, appointmentDetail) {
    return this.http.post<AppointmentModel>(`${this.baseUrl}/${path}`, appointmentDetail);
  }

  getDoctorDetail(path: string) {
    return this.http.get<DoctorModel>(`${this.baseUrl}/${path}`);
  }

  getAppointmentReport(path: string) {
    return this.http.get<AppointmentReportModel>(`${this.baseUrl}/${path}`);
  }
}
