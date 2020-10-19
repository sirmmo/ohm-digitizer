import { Observable } from 'rxjs';
import { OhmService } from './../../ohm.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  workables: Observable<any[]>;


  loading;

  count;

  filter: any = {};

  constructor(
    private ohm: OhmService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.workables = this.getPage();
  }

  go(type, id): void{
    this.router.navigate(['work', type, id]);
  }

  goPage(event) {
    this.workables = this.getPage(event.pageIndex);
  }
  getPage(num = 0) {
    this.loading = true;
    return this.ohm.workables(num, this.filter).pipe(tap( (x: any) => {
      this.count = x.count;
      this.loading = false;
    }), map(x => {
      return x.results;
    }));
  }

  iconfor(type) {
    switch (type) {
      case 'picture':
        return 'image';
      case 'text':
        return 'text_snippet';
      case 'movementmap':
        return 'trending_up';
      case 'view':
        return 'visibility';
      default:
        return type;
    }
  }

  actionfor(type) {
    switch (type) {
      case 'movementmap':
        return 'location_on';
      case 'map':
        return 'location_on';
      default:
        return 'visibility';
    }
  }

  toggleChange(ev){
    if (ev.value.length > 0) {
      this.filter['properties.type'] = {$in: ev.value};
      console.log(this.filter);
    } else {
      delete this.filter['properties.type'];
    }
    this.workables = this.getPage();
  }


  tagImage(id): void {
    this.router.navigate(['tag', id]);
  }

}
