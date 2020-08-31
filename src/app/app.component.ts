import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links = [
    { label: 'Upload Image', route: 'upload' },
    { label: 'Tag Image Areas', route: 'tag' },
    { label: 'Work Image', route: 'list' },
  ]
  title = 'ohm-digitizer';

  user = {
    username: 'sirmmo'
  }

  activeLink: string;

  constructor(
    private router: Router,
    private ar: ActivatedRoute
  ) { }

  go(route: string): void{
    this.activeLink = route;
    this.router.navigateByUrl(route);
  }
}
