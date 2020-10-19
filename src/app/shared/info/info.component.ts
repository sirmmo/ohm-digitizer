import { InfoboxComponent } from './../infobox/infobox.component';
import { OhmService } from './../../ohm.service';
import { Component, OnInit, Inject, ViewChild, ContentChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ohm-meta',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  meta: any = {};
  id;

  @ViewChild(InfoboxComponent) info: InfoboxComponent;

  constructor(
    public dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      console.log(this.data);
      this.meta = this.data.meta;
      this.id = this.data.id;
    }
    if (!this.meta.date) {
      this.meta.date = {};
    }

  }

  save(): void {
    this.info.save();
    this.dialogRef.close();
  }

}
