import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errmessage: any;
  sessions: any;

  constructor(private loginservice: LoginService, private routes: Router) { }

  ngOnInit(): void {
  }

  loginform = new FormGroup({
    email: new FormControl('ajay@gmail.com', Validators.required),
    password: new FormControl('123456', Validators.required),
  });

  onSubmit() {
    // console.log(this.loginform.value);
    this.loginservice.getsession().subscribe(
      (res:any) => {
        // console.log('session',res);
        this.sessions = res
      }
    )
    this.loginservice.getlogin().subscribe(
      res => {
        // console.log('check',res);
        if (res == true) {
          
          localStorage.setItem('session', this.sessions.res.email);
          this.routes.navigate(['/']);
        }
      }
    )

    this.loginservice.login(this.loginform.value).subscribe(
      (res: any) => {
        if (res.status == 2) {
          console.log(res);
          this.errmessage = 'Something Wrong!!'
        } else {
          this.loginservice.sessionstore(res);
          this.loginservice.sendlogin();
        }

      }
    )


  }
}
