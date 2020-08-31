import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OhmService {

  base = 'http://51.15.160.236:9032/';

  constructor(
    private http: HttpClient
  ) { }

  imageList(page = 0, query?): Observable<any> {
    return this.http.get<any>(this.base + 'images?p=' + page);
  }5

  archives(): Observable<string[]> {
    return this.http.get<string[]>(this.base + 'archives');
  }

  getImage(id): Observable<any> {
    return this.http.get(this.base + 'image/' + id);
  }

  saveTags(id, featurecollection, meta, iiif): Observable<any> {
    return this.http.post(this.base + 'saveTags', {id, featurecollection, meta, iiif});
  }

  workables(page = 0, query?): Observable<any[]> {
    return this.http.get<any[]>(this.base + 'workables', { 
      params: new HttpParams().append('p', page.toString()).append('type', JSON.stringify(query))
    });
  }


  getWorkable(id): Observable<any> {
    return this.http.get(this.base + 'workable/' + id);
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



}
