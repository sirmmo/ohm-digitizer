import { MnAuthService } from './../../mn-auth/mn-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private mna: MnAuthService
  ) { }

  ngOnInit(): void {
    this.mna.logout();
  }

}
