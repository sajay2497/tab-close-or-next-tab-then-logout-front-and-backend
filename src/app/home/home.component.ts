import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userdata: any;

  constructor(private loginservice: LoginService) { }

  ngOnInit(): void {

    this.loginservice.getsession().subscribe(
      res => {
        this.userdata = res
      }
    )
    this.loginservice.sendlogin();
    let se = localStorage.getItem('session');
    if (se) {
      this.loginservice.sessionstore(se);
      localStorage.removeItem('session');
    }




  }

}
