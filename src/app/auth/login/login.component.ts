import { MnAuthService } from './../../mn-auth/mn-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private mna: MnAuthService
  ) { }

  ngOnInit(): void {
  }

  social(social: string): void {
    this.mna.socialLogin(social);
  }

}
