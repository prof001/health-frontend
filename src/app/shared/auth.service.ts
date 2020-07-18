import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginModel} from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/v1';
  constructor(private http: HttpClient, private router: Router) {}

  loginDoctor(path: string, doctorDetail) {
    return this.http.post<LoginModel>(`${this.baseUrl}/${path}`, doctorDetail);
  }

  loggedIn() {
    return !!localStorage.getItem('x-access-token');
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  logOut() {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('doctorId');
    this.router.navigate(['/home']);
  }
}
