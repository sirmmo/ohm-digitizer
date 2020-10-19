import { InfoComponent } from './../../shared/info/info.component';
import { Observable } from 'rxjs';
import { OhmService } from './../../ohm.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  imgList: Observable<any[]>;

  page = 0;

  count = 0;

  loading = false;

  archives;

  filter: any = {};

  constructor(
    private ohm: OhmService,
    private router: Router,
    private d: MatDialog
  ) { }



  ngOnInit(): void {
    this.imgList = this.getPage();
    this.archives = this.ohm.archives();
  }

  go(id){
    this.router.navigate(['tag', id]);
  }

  goPage(event){
    this.imgList = this.getPage(event.pageIndex);
  }

  getPage(num = 0) {
    this.loading = true;
    return this.ohm.imageList(num).pipe(tap(x => {
      this.count = x.count;
      this.loading = false;
    }), map(x => {
      return x.results;
    }));
  }

  info(id, meta) {
    this.d.open(InfoComponent, {data: {meta, id}});
  }
}
