import { AdvancedComponent } from './../advanced/advanced.component';
import { Observable } from 'rxjs';
import { OhmService } from './../../ohm.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { KnownComponent } from './../known/known.component';
declare const L;

@Component({
  selector: 'app-georeferencer',
  templateUrl: './georeferencer.component.html',
  styleUrls: ['./georeferencer.component.scss']
})
export class GeoreferencerComponent implements OnInit, AfterViewInit {

  lmap;
  rmap;
  interpolation = "near";
  maps: Observable<any[]>;

  gcps = [];

  mingcps = 1;

  id;

  image;

  iiifLayer;

  mlayers = [];
  constructor(
    private ar: ActivatedRoute,
    private d: MatDialog,
    private ohm: OhmService
  ) { }

  ngOnInit(): void {
    this.id = this.ar.snapshot.params.id;
  }

  ngAfterViewInit(): void {
    this.rmap = L.map('rmap').setView({ lon: 0, lat: 0 }, 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(this.rmap);

    // show the scale bar on the lower left corner
    L.control.scale().addTo(this.rmap);
    this.ohm.getWorkable(this.id).subscribe(meta => {
      this.image = meta;
      let pd = this.image.meta.filter(x=>x.meta_type==="period");
      if (pd.length>0){
        pd = pd[0];
      } else{
        pd = {
          time_from: -8000, time_to: 2500
        }
      }
      let tgs = this.image.tags.filter(x=>x.geo_x !== null);
      if (tgs.length > 0){
        tgs = tgs[0];
      } else {
        tgs = null;
      }
      
      this.maps = this.ohm.getPyramids({area: tgs, from: pd.time_from, to: pd.time_to});

      this.lmap = L.map('lmap', {
        center: [0, 0],
        crs: L.CRS.Simple,
        zoom: 0,
        minzoom: 0,
        maxzoom: 19,
      });

      const iiifUrl = 'https://iiif.openhistorymap.org/iiif/3/' + this.image.file.replaceAll("/", "%2F") + '/info.json';

      this.iiifLayer =  L.tileLayer.iiif(iiifUrl);
      this.iiifLayer.addTo(this.lmap);

      setTimeout(_ => {

        this.ohm.getGcps(this.id).subscribe((data: any[]) => {
          const coeff = Math.pow(2, this.iiifLayer.maxZoom);
          console.log(data);
          this.gcps = data.map(x => {
            const rc = x.color;
            x.image_y = Math.abs(x.image_y);
            x.lmarker = L.circleMarker({ lng: x.image_x / coeff, lat: - x.image_y / coeff }, { color: rc }).addTo(this.lmap);
            x.rmarker = L.circleMarker({ lng: x.geo_x, lat: x.geo_y }, { color: rc }).addTo(this.rmap);
            return x;
          });
        });
      }, 500);


    });

  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  addGCP(){
    const coeff = Math.pow(2, this.iiifLayer.maxZoom);
    const rc = this.getRandomColor();
    const data: {} = { color:rc};
    this.lmap.on('click', (e) => {
      const lmarker = new L.circleMarker(e.latlng, { color: rc}).addTo(this.lmap);
      data['image_x'] = e.latlng.lng * coeff;
      data['image_y'] = - e.latlng.lat * coeff;
      this.lmap.off('click');
      lmarker.on('click', (e)=>{
        this.d.open(KnownComponent, )
      })
      this.rmap.on('click', (e) => {
        const rmarker = new L.circleMarker(e.latlng, { color: rc}).addTo(this.rmap);
        data['geo_x'] = e.latlng.lng;
        data['geo_y'] = e.latlng.lat;
        this.rmap.off('click');
        data['lmarker'] = lmarker;
        data['rmarker'] = rmarker;
        console.log(data);
        this.gcps.push(data);
      });
    });
  }

  save() {
    this.ohm.storeGcps(this.id, this.gcps.map(x => {
      return {
        image_id: this.id,
        color: x.color,
        author: "sirmmo",
        image_x: x.image_x,
        image_y: x.image_y,
        geo_x: x.geo_x,
        geo_y: x.geo_y,
      };
    })).subscribe(data => {
      
    });
  }

  runGeoref(){
    this.ohm.runGeoref(this.id, this.interpolation).subscribe(data => {
      console.log(data);
    });
  }



  setLayers(event) {
    console.log(event);

    this.mlayers.map(x=> {
      this.rmap.removeLayer(x);
    });

    this.mlayers = [];

    event.value.map(x => {
      const r = L.tileLayer('https://maps.digitize.openhistorymap.org/' + x + '/{z}/{x}/{y}.png', { tms: true, opacity: 0.8, attribution: '' });  
      this.mlayers.push(r);
      this.rmap.addLayer(r);
    });
    
    
  }

  advanced(){
    let ref = this.d.open(AdvancedComponent, {data: {interpolation:this.interpolation}});
    ref.afterClosed().subscribe(data =>{
      console.log(data);
      this.interpolation = data.interpolation;
    })
  }

  refreshMaps() {
    this.maps = this.ohm.getPyramids();
  }

  delete(row): void {
    this.ohm.deleteGCP(row.id).subscribe(data=>{
      const idx = this.gcps.indexOf(row);
      this.gcps.splice(idx, 1);
      this.lmap.removeLayer(row.lmarker);
      this.rmap.removeLayer(row.rmarker);
    })
  }

  getWHG(){
    this.ohm.getWHG(this.id).subscribe();
  }

}
