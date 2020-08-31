import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textmeta',
  templateUrl: './textmeta.component.html',
  styleUrls: ['./textmeta.component.scss']
})
export class TextmetaComponent implements OnInit {

  options = [
    'Italian',
    'English',
    'German'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
