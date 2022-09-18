import { OhmService } from './../../ohm.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';

declare const L;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, AfterViewInit {

  tags: any[] = [];
  map;

  id;

  meta;

  iiif;
  constructor(
    private ar: ActivatedRoute,
    private ohm: OhmService,
  ) { }

  ngOnInit(): void {
    this.id = this.ar.snapshot.params.id;

  }

  ngAfterViewInit(): void {
    this.ohm.getWorkable(this.id).subscribe(meta => {
      this.meta = meta;
      const iiifUrl = 'https://iiif.openhistorymap.org/' + this.meta.file + '/info.json';

      this.map = L.map('iiif-map', {
        center: [0, 0],
        crs: L.CRS.Simple,
        zoom: 0,
        minzoom: 0,
        maxzoom: 19,
      });



      const iiifl = L.tileLayer.iiif(iiifUrl);
      iiifl.addTo(this.map);
    });
  }


}
