import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppointmentModel} from '../models/appointment.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://localhost:3000/api/v1';
  constructor(private http: HttpClient) {}

  createDoctor(path: string, doctorDetail) {
    return this.http.post(`${this.baseUrl}/${path}`, doctorDetail);
  }

  bookAppointment(path: string, appointmentDetail) {
    return this.http.post<AppointmentModel>(`${this.baseUrl}/${path}`, appointmentDetail);
  }
}
