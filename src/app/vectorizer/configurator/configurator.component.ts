import { ActivatedRoute } from '@angular/router';
import { OhmService } from './../../ohm.service';
import { Component, OnInit } from '@angular/core';

declare const L;

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {

  tags;
  meta;
  map;
  id;
  bbox;
  drawnItems;
  drawControl;

  mode;

  colors;

  drawers = {};

  constructor(
    private ar: ActivatedRoute,
    private ohm: OhmService
  ) { }

  ngOnInit(): void {
    this.id = this.ar.snapshot.params.id;
    this.mode = this.ar.snapshot.params.mode;
    this.ohm.getPyramid(this.id).subscribe((data: any) => {
      console.log(data);
      this.map = L.map('map').setView({ lon: 0, lat: 0 }, 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(this.map);

      this.map.flyToBounds([[data.bbox[1], data.bbox[0]], [data.bbox[3], data.bbox[2]]]);
      this.drawnItems = new L.FeatureGroup();
      this.map.addLayer(this.drawnItems);
      this.drawControl = new L.Control.Draw({
        draw: false,
        edit: {
          featureGroup: this.drawnItems
        }
      });
      this.map.addControl(this.drawControl);
      const r = L.tileLayer('https://maps.digitize.openhistorymap.org/' + data.id + '/{z}/{x}/{y}.png', { tms: true, opacity: 0.6, attribution: '' });
      this.map.addLayer(r);
      this.map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        console.log(layer);
        this.drawnItems.addLayer(layer);
      });

      this.map.on('click', (event) => {
        const layer = event.layer;
        console.log(layer);
      });
      this.drawers = {
        point: new L.Draw.CircleMarker(this.map, {guideLayers: this.drawnItems}),
        polygon: new L.Draw.Polygon(this.map, {guideLayers: this.drawnItems}),
        line: new L.Draw.Polyline(this.map, {guideLayers: this.drawnItems})
      }
    });
  }

  addColor() {
    this.colors.push({
      'color':'#000000', 'tags':{}
    });    
  }

  saveAutomatic() {

  }
  saveManual() {

  }
  info(){}

  draw(mode: string): void {
    this.drawers[mode].enable();  
  }

}
