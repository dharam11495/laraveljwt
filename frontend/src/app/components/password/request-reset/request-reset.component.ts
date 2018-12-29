import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  };

  constructor(
    private Jarwis:JarwisService,
    private notify : SnotifyService,
    private Notify : SnotifyService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.Notify.info('Wait...' ,{timeout:5000})
    this.Jarwis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.warning('Mail Already Send',error.errors)
    );

  }
  handleResponse(res) {
    this.Notify.success(res.data,{timeout:0});
    this.form.email = null;
  }
}
