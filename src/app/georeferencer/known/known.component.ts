import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-known',
  templateUrl: './known.component.html',
  styleUrls: ['./known.component.scss']
})
export class KnownComponent implements OnInit {
  data = {named_place:'', is_gcp:true};
  constructor() { 

  }

  ngOnInit(): void {
  }

}
