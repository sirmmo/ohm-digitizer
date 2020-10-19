import { OhmService } from './../../ohm.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ohm-info',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.scss']
})
export class InfoboxComponent {

  @Input() meta: any = {date: {}};
  @Input() id;
  @Input() form;
  @Input() file;
  constructor(
    private ohm: OhmService
  ) { }

  save() {
    this.meta.form = this.form;
    this.meta.file = this.file;
    this.ohm.updateMetadata(this.id, this.meta).subscribe(data => {
      console.log(data);
    });
  }
}
