import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs';
import { JarwisService } from '../../services/jarwis.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email:null,
    password:null
  };

 public error = null;
  constructor(
    private Jarwis:JarwisService,
    private Token:TokenService,
    private router:Router,
    private Auth:AuthService,
    private Notify:SnotifyService
  ) { }

  onSubmit() {
  this.Jarwis.login(this.form).subscribe(
     data => this.handleResponse(data),
     error => this.handleError(error)
  );
  }

  handleResponse(data){
 this.Token.handle(data.access_token);
 this.Auth.changeAuthStatus(true);
 this.router.navigateByUrl('/profile');
  }


  handleError(error){
    this.Notify.error(error.error.error,{timeout:0});
 this.error = error.error.error;
  }

  ngOnInit() {
  }

}
