import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DoctorModel} from '../models/doctor.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://localhost:3000/api/v1';
  constructor(private http: HttpClient) {}

  getDoctors(path: string) {
    return this.http.get<DoctorModel[]>(`${this.baseUrl}/${path}`);
  }

  createDoctor(path: string, doctorDetail) {
    return this.http.post(`${this.baseUrl}/${path}`, doctorDetail);
  }
}
