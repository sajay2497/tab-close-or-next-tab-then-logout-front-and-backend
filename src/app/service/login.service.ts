import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  private check = new BehaviorSubject(false);
  private session = new Subject();

  login(body: any) {
    return this.http.post('http://localhost:3000/login', body);
  }
  sendlogin() {
    this.check.next(true);
  }
  getlogin(): Observable<any> {
    return this.check.asObservable();
  }
  removelogin() {
    this.check.next(false);
  }
  sessionstore(body: any) {
    this.session.next(body);
  }
  getsession() {
    // console.log(this.session.asObservable());
    
   return this.session.asObservable();
  }
}
