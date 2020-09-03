import { Observable } from 'rxjs';
import { OhmService } from './../../ohm.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare const L;

@Component({
  selector: 'app-georeferencer',
  templateUrl: './georeferencer.component.html',
  styleUrls: ['./georeferencer.component.scss']
})
export class GeoreferencerComponent implements OnInit, AfterViewInit {

  lmap;
  rmap;
  
  maps: Observable<any[]>;

  gcps = [];

  mingcps = 1;

  id;

  image;

  iiifLayer;

  mlayers = [];
  constructor(
    private ar: ActivatedRoute,
    private ohm: OhmService
  ) { }

  ngOnInit(): void {
    this.id = this.ar.snapshot.params.id;
    this.maps = this.ohm.getPyramids();
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

      this.lmap = L.map('lmap', {
        center: [0, 0],
        crs: L.CRS.Simple,
        zoom: 0,
        minzoom: 0,
        maxzoom: 19,
      });

      const iiifUrl = 'https://iiif.openhistorymap.org/' + this.image.file + '/info.json';

      this.iiifLayer =  L.tileLayer.iiif(iiifUrl);
      this.iiifLayer.addTo(this.lmap);

      setTimeout(_ => {

        this.ohm.getGcps(this.id).subscribe((data: any[]) => {
          const coeff = Math.pow(2, this.iiifLayer.maxZoom);
          console.log(data);
          this.gcps = data.map(x => {
            const rc = this.getRandomColor();
            x.gcp[1] = Math.abs(x.gcp[1]);
            return [
              rc,
              ...x.gcp,
              new L.circleMarker({ lng: x.gcp[0] / coeff, lat: - x.gcp[1] / coeff }, { color: rc }).addTo(this.lmap),
              new L.circleMarker({ lng: x.gcp[2], lat: x.gcp[3] }, { color: rc }).addTo(this.rmap)
            ];
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
    const data: any[] = [rc];
    this.lmap.on('click', (e) => {
      const lmarker = new L.circleMarker(e.latlng, { color: rc}).addTo(this.lmap);
      data.push(...[e.latlng.lng * coeff, - e.latlng.lat * coeff]);
      this.lmap.off('click');
      this.rmap.on('click', (e) => {
        const rmarker = new L.circleMarker(e.latlng, { color: rc}).addTo(this.rmap);
        data.push(...[e.latlng.lng, e.latlng.lat]);
        this.rmap.off('click');
        data.push(lmarker);
        data.push(rmarker);
        console.log(data);
        this.gcps.push(data);
      });
    });
  }

  save() {
    this.ohm.storeGcps(this.id, this.gcps.map(x => {
      return [x[1], x[2], x[3], x[4]];
    })).subscribe(data => {
      
    });
  }

  runGeoref(){
    this.ohm.runGeoref(this.id).subscribe(data => {
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

}
