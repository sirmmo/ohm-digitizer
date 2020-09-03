import { InfoComponent } from './../info/info.component';
import { OhmService } from './../../ohm.service';
import { MetaComponent } from './../meta/meta.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

declare const L;
declare const $;

@Component({
  selector: 'app-tagger',
  templateUrl: './tagger.component.html',
  styleUrls: ['./tagger.component.scss']
})
export class TaggerComponent implements OnInit, AfterViewInit {

  tags: any[] = [];
  map;

  id;

  meta;

  iiif;
  constructor(
    private ar: ActivatedRoute,
    private d: MatDialog,
    private ohm: OhmService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = this.ar.snapshot.params.id;
  
  }

  ngAfterViewInit(): void {
    this.ohm.getImage(this.id).subscribe(meta => {
      this.meta = meta;
      const iiifUrl = 'https://iiif.openhistorymap.org/' + this.meta.file + '/info.json';
      this.ohm.getiiif(iiifUrl).subscribe(iiif => {
        this.iiif = iiif;

        this.map = L.map('iiif-map', {
          center: [0, 0],
          crs: L.CRS.Simple,
          zoom: 0,
          minzoom: 0,
          maxzoom: 19,
        });



        const iiifl = L.tileLayer.iiif(iiifUrl);
        iiifl.addTo(this.map);
        const drawnItems = new L.FeatureGroup().setStyle();
        this.map.addLayer(drawnItems);
        const drawControl = new L.Control.Draw({
          draw: {
            marker: false,
            polyline: false,
            circlemarker: false,
            circle: false,
          },
          edit: {
            featureGroup: drawnItems
          }
        });
        this.map.addControl(drawControl);

        this.map.on(L.Draw.Event.CREATED, (e) => {
          const type = e.layerType;
          const layer = e.layer;
          this.d.open(MetaComponent, { data: { layer, iiif: this.iiif, bounds: iiifl } }).afterClosed().subscribe(
            data => {
              console.log(data);
              this.tags.push(data);
            }
          )
          drawnItems.addLayer(layer);
        });


        this.map.on(L.Draw.Event.EDITED, (e) => {
          const layers = e.layers;
          layers.eachLayer((layer) => {
            this.d.open(MetaComponent, { data: { layer, iiif: this.iiif, bounds: iiifl } }).afterClosed().subscribe(
              data => {
                console.log(data);
                this.tags.push(data);
              }
            );
            drawnItems.addLayer(layer);
          });
        });

      });
    });
  }

  save(): void {
    this.ohm.saveTags(this.id, {type: 'FeatureCollection', features: this.tags }, this.meta, this.iiif).subscribe(data => {
      this.snackBar.open(data.added + ' tags stored. Images are being extracted.', 'Ok', {duration: 2000});
    });
  }

  info() {
    this.d.open(InfoComponent, {data: {meta: this.meta, id: this.id}});
  }
}
