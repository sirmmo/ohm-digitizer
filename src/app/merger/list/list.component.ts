import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OhmService } from './../../ohm.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pyramids: Observable<any[]>;


  loading;

  count;

  filter: any = {};

  constructor(
    private ohm: OhmService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pyramids = this.getPage().pipe(tap(x => {
      console.log(x);
    }));
  }

  go(id): void {
    this.router.navigate(['vectorize', id]);
  }

  goPage(event): void {
    this.pyramids = this.getPage(event.pageIndex);
  }
  getPage(num = 0): Observable<any[]> {
    this.loading = true;
    return this.ohm.getPyramids().pipe(tap((x: any) => {
      this.count = x.count;
      this.loading = false;
    }), map(x => {
      return x;
    }));
  }


  tagImage(id): void {
    this.router.navigate(['tag', id]);
  }

  prepareMerge(tomerge: any[]) {
    console.log(tomerge);
    this.router.navigate(['merger', (tomerge.map(x => x.value)).join('|')]);

  }

}
