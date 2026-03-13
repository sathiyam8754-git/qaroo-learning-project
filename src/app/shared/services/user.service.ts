import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private config: ConfigurationService,private http: HttpClient) { }
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
  }
  
  SignUp(data: any) {
    return this.http.post(this.config.getApiUrl() + 'auth/signup', data, {
      headers: this.getHeaders()
    });
  }
  
  Login(data: any) {
    return this.http.post(this.config.getApiUrl() + 'auth/login', data, {
      headers: this.getHeaders()
    });
  }

  forgotPassword(email: string) {
    return this.http.post(this.config.getApiUrl() + 'auth/forgot-password', { email }, {
      headers: this.getHeaders()
    });
  }

  resetPassword(token: string, password: string) {
    return this.http.post(this.config.getApiUrl() + `auth/reset-password/${token}`, { password }, {
      headers: this.getHeaders()
    });
  }
}
