import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import env from '../assets/env.json';
import { MnDockerService } from '@modalnodes/mn-docker';

@Injectable({
  providedIn: 'root'
})
export class OhmService {
  getWHG(id: any) {
    return this.http.get(this.base+'workables/'+id+'/whg')
  }
  deleteGCP(id: any) {
    return this.http.delete(this.base+'deleteGcp?id='+id);
  }

  base = env.ENDPOINT;
  txbase = env.TAXONOMY_ENDPOINT;
  mbase = env.MAPPING_ENDPOINT;

  constructor(
    private http: HttpClient,
    private docker: MnDockerService
  ) {
    this.base = docker.getEnv('ENDPOINT');
    this.txbase = docker.getEnv('TAXONOMY_ENDPOINT');
    this.mbase = docker.getEnv('MAPPING_ENDPOINT');
  }

  upload(file) {
    return this.http.get<any>(this.base + 'upload', { params: new HttpParams().append('file', file)} );
  }

  uploadFile(file, url) {
    let ct = 'image/png';
    let mode = 'du';
    switch(file.data.name.split('.')[1]) {
      case 'geojson':
      case 'json':
        ct = 'application/json';
        mode = 't';
        break;
      case 'csv':
        ct = 'application/csv';
        mode = 't';
        break;
      case 'jpg':
      case 'jpeg':
      case 'jfif': 
        ct = 'image/jpeg';
        break;
      case 'png':
        ct = 'image/png';
        break;
      case 'tif':
      case 'tiff':
      case 'geotiff':
        ct = 'image/tiff';
        break;
      case 'gif':
        ct = 'image/gif';
        break;
    }

    let hh = new HttpHeaders();
    hh = hh.append('Content-Type', ct);
    hh = hh.append('Accept', 'application/json');
    return new Promise((resolve, reject) => {
      this.changeFile(file, mode).then((data: string) => {
        fetch(url, {
          body: file.data,
          method: 'PUT'
        }).then(_ => {
          resolve(true);
        });
      });
    });
  }

  changeFile(file, mode) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (mode === 'du'){
        reader.readAsDataURL(file.data);
      } else {
        reader.readAsText(file.data);
      }
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  imageList(page = 0, query?: any): Observable<any> {
    return this.http.get<any>(this.base + 'images', {params: {p: page.toString(), filter: JSON.stringify(query)}});
  }

  archives(): Observable<string[]> {
    return this.http.get<string[]>(this.base + 'archives');
  }

  getImage(id): Observable<any> {
    return this.http.get(this.base + 'images/' + id);
  }

  saveTags(id, featurecollection, meta, iiif): Observable<any> {
    return this.http.post(this.base + 'saveTags', {id, featurecollection, meta, iiif});
  }

  workables(page = 0, query?): Observable<any[]> {
    return this.http.get<any[]>(this.base + 'workables', { 
      params: {p: page.toString(),filter: JSON.stringify(query)}
    });
  }


  getWorkable(id): Observable<any> {
    return this.http.get(this.base + 'workables/' + id);
  }

  storeGcps(id, gcps): Observable<any> {
    return this.http.post(this.base + 'storeGcps', { id, gcps });
  }

  getiiif(url){
    return this.http.get(url);
  }

  getGcps(id) {
    return this.http.get(this.base + 'gcps/' + id);
  }


  runGeoref(id, interpolation) {
    return this.http.get(this.base + 'georef/' + id, {params: {interpolation:interpolation}});
  }


  getPyramids(query?): Observable<any[]> {
    return this.http.get<any[]>(this.base + 'pyramids', {params: {filter:JSON.stringify(query)}});
  }

  getPyramid(id): Observable<any> {
    return this.http.get<any[]>(this.base + 'pyramids/' + id);
  }

  updateMetadata(id, meta): Observable<any> {
    return this.http.post<any>(this.base + 'updateMeta/' + id, meta);
  }

  createMetadata(meta): Observable<any> {
    return this.http.post<any>(this.base + 'updateMeta', meta);
  }

  getShapes(): Observable<any[]> {
    return this.http.get<any[]>(this.base + 'vectors');
  }

  getShape(id): Observable<any> {
    return this.http.get<any[]>(this.base + 'vectors/' + id);
  }


  getTypes() {
    return this.http.get(this.txbase + 'types');
  }
  getRelations() {
    return this.http.get(this.txbase + 'relations');
  }
  getProperties() {
    return this.http.get(this.txbase + 'properties');
  }

  saveFeature(id, data, geom, from, to) {
    return this.http.post(this.mbase + 'items', { id, properties: data, geometry: geom, from, to });
  }


  saveFeatures(itms: { id, data, geom, from, to}[]) {
    const up = itms.map(x => {
      return { id: x.id, properties: x.data, geometry: x.geom, from: x.from, to: x.to };
    });
    return this.http.post(this.mbase + 'items', up);
  }

}
