import { OhmService } from './../../ohm.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  ids;

  constructor(
    private ar: ActivatedRoute,
    private ohm: OhmService
  ) { }

  ngOnInit(): void {
    this.ids = this.ar.snapshot.params.ids.split('|');
  }

}
