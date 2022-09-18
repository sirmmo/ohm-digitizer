import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links = [
    //{ label: 'Upload', route: 'upload' },
    { label: 'Cut images', route: 'tag', enabled:true},
    { label: 'Work Image', route: 'list', enabled:true },
    { label: 'Merger', route: 'merger', enabled:false },
    { label: 'Vectorize', route: 'vectorize', enabled:false },
    { label: 'OHMify', route: 'ohmify', enabled:false },
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
