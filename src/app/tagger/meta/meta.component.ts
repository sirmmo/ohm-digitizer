import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent implements OnInit {

  mode;

  rdata: any = {};

  constructor(
    public dialogRef: MatDialogRef<MetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.rdata = this.data.layer.toGeoJSON();
    console.log(this.data);
    const h = this.data.iiif.height;
    const w = this.data.iiif.width;
    const bounds = this.data.bounds;
    this.rdata.geometry.coordinates = this.rdata.geometry.coordinates.map(x => {
      return x.map(y => {
        return y.map(z => {
          return z * Math.pow(2, bounds.maxZoom);
        });
      });
    });

    this.rdata.geometry.coordinates = this.rdata.geometry.coordinates.map(x => {
      return x.map(y => {
        const a = y;
        a[1] = - a[1];
        return a;
      });
    });
  }

  changeContent(event): void{
    this.mode = event.value;
    this.rdata.properties = { type: this.mode };
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
