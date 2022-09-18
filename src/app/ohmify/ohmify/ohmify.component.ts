import { InfoComponent } from './../info/info.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { OhmService } from './../../ohm.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as md5 from 'md5';
import { filter, tap, map } from 'rxjs/operators';

import turf from '@turf/turf';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

declare const L;

@Component({
  selector: 'app-ohmify',
  templateUrl: './ohmify.component.html',
  styleUrls: ['./ohmify.component.scss']
})
export class OhmifyComponent implements OnInit {

  tags;
  meta;
  map;
  id;
  bbox;

  layer;

  fields = [];

  features = [];

  shownFeature: any;
  featureData = {};
  fid;
  rows = [];
  baseRows;
  addRows;
  sl;

  
  fixeds = [];
  fixations = {};

  conversions = [];
  conversion = {};

  highlight = {
    fillColor: 'yellow',
    weight: 2,
    opacity: 1
  };

  done = {
    fillColor: 'red',
    weight: 2,
    opacity: 1
  };

  @ViewChild('fixTable') table: MatTable<any>;

  constructor(
    private ar: ActivatedRoute,
    private ohm: OhmService,
    private http: HttpClient,
    private md: MatDialog
  ) { }

  ngOnInit(): void {
    this.ohm.getProperties().pipe(map((x: any) => {
      this.addRows = x;
      return x.filter(j => j.in.indexOf('object') >= 0);
    })).subscribe(data => {
      this.baseRows = data;
    });
    this.id = this.ar.snapshot.params.id;
    this.ohm.getShape(this.id).subscribe((data: any) => {
      console.log(data);
      this.map = L.map('map').setView({ lon: 0, lat: 0 }, 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(this.map);

      this.http.get('https://files.digitize.openhistorymap.org/ohm/' + data.meta.file).subscribe(geojsonData =>{
        this.fields = [];
        this.layer = L.geoJSON(geojsonData, {
          pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, {
              radius: 8,
              fillColor: '#ff7800',
              color: '#000',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            });
          },
          onEachFeature: (feature, layer) => {
            this.features.push(feature);
            layer.setStyle(this.style);
            this.fields.push(...Object.keys(feature.properties));
            this.fields = [... new Set(this.fields)];
            this.conversions = this.fields.map(x => {
              return {
                name: x, 
                value: null,
                delete: true
              };
            });// does this feature have a property named popupContent?
            if (feature.properties) {
              layer.on({
                click: (event) => {
                  this.layer.setStyle(this.style);
                  layer.setStyle(this.highlight);
                  this.sl = layer;
                  this.shownFeature = feature;
                  this.featureData = feature.properties;
                  this.fid = md5(JSON.stringify(feature, null, 2));
                  this.rows = [
                    ...Object.keys(feature.properties).map(x => {
                      return {
                        name: x, value: feature.properties[x]
                      };
                    }),
                    ...this.baseRows.filter(x => Object.keys(feature.properties).indexOf(x.name) < 0)
                  ];
                }
              });
            }
          }
        });
        this.map.addLayer(this.layer);
      });
    });
  }

  popupify(object) {
    let ret = '<table>';
    Object.keys(object).forEach(x => {
      ret += '<tr><td>' + x + '</td><td>' + object[x] + '</td></tr>';
    });
    ret += '</table>';
    return ret;
  }


  delete(element) {
    const i = this.rows.indexOf(element);
    delete this.featureData[element.name];
    this.rows = [...this.rows.slice(0, i), ...this.rows.slice(i + 1, this.rows.length)];
  }

  deleteMass(element) {
    const i = this.conversions.indexOf(element);
    if (Object.keys(this.conversions[i]).indexOf('delete') < 0) {
      this.conversions[i].delete = true;
    } else {
      this.conversions[i].delete = !this.conversions[i].delete;
    }
    this.conversion[element.name] = this.conversions[i].delete;
  }

  addColor() {

  }

  info() { 
    console.log(this.layer);
    this.md.open(InfoComponent, {data: {
      features: this.layer._layers.length
    }});
  }

  style(feature) {
    return {
      fillColor: 'green',
      fillOpacity: 0.5,
      weight: 2,
      opacity: 1,
      color: '#ffffff',
      dashArray: '3'
    };
  }

  unselect() {
    this.layer.setStyle(this.style);
    this.shownFeature = null;
    this.featureData = null;
  }

  addFixed() {
    this.fixeds.push({name: 'aa', value: 'aa'});
    this.table.renderRows();
  }

  convertPolyToLines() {
    const poly = turf.polygon(this.shownFeature.geometry.coordinates);
    const line = turf.polygonToLine(poly);
    console.log(line);
    this.shownFeature.geometry = line;

  }
  convertLineToPoints() {
    const poly = turf.polygon(this.shownFeature.geometry.coordinates);
    const line = turf.polygonToLine(poly);
    console.log(line);
    this.shownFeature.geometry = line;

  }
  convertPolygonToPoints() {
    const poly = turf.polygon(this.shownFeature.geometry.coordinates);
    const line = turf.polygonToLine(poly);
    console.log(line);
    this.shownFeature.geometry = line;

  }

  save() {
    console.log(this.featureData);
    this.ohm.saveFeature(this.fid, this.featureData, this.shownFeature.geometry, this.featureData['ohm:date:from:year'], this.featureData['ohm:date:to:year']).subscribe(data => {
      console.log(data);
      this.sl.setStyle(this.done);
    });

  }
  upload() {
    const up = [];
    for (let f of this.features) {
      for (const k of Object.keys(this.conversion)) {
        if (this.conversion[k] && typeof (this.conversion[k]) === 'string') {
          f.properties[this.conversion[k]] = f.properties[k];
          delete f.properties[k];
        } else if (!this.conversion[k] && typeof (this.conversion[k]) === 'boolean'){
          delete f.properties[k];
        }
      }
      f.properties = {...this.fixations, ...f.properties};
      const fid = md5(JSON.stringify(f, null, 2));
      up.push({
        data: f.properties,
        geom: f.geometry,
      });
    }
    this.ohm.saveFeatures(up).subscribe(data => {
      console.log(data);
    });
    // add conversions
    // add fixations
    // store
  }
}
