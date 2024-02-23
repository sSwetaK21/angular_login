import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  apiUrl = 'http://localhost:3000/user';

  getAll() {
    return this._http.get(this.apiUrl);
  }

  getByCode(code: any) {
    return this._http.get(this.apiUrl + '/' + code);
  }

  procedRegister(inputData: any) {
    return this._http.post(this.apiUrl, inputData);
  }

  updateUser(code: any, inputData: any) {
    return this._http.put(this.apiUrl + '/' + code, inputData);
  }

  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  getUserRole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }

  getAllRole() {
    return this._http.get('http://localhost:3000/role');
  }
}
