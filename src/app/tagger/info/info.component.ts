import { OhmService } from './../../ohm.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  meta;
  id;

  constructor(
    public dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ohm: OhmService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.meta = this.data.meta;
    if (!this.meta.date) {
      this.meta.date = {};
    }
    this.id = this.data.id;
  }

  save(): void {
    this.ohm.updateMetadata(this.id, this.meta).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }

}
