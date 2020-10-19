import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {

  options = [
    { label: 'Nearest Neighbour', opt: 'near' },
    { label: 'Bilinear', opt: 'bilinear' },
    { label: 'Cubic', opt: 'cubic' },
    { label: 'Lanczos', opt: 'lanczos' },
    { label: 'Cubic Spline (2)', opt: 'cubicspline -o 2' },
    { label: 'Cubic Spline (3)', opt: 'cubicspline -o 3' },
    { label: 'Cubic Spline (5)', opt: 'cubicspline -o 5' },
    { label: 'Average', opt: 'average' },
    { label: 'Mode', opt: 'mode' },
    { label: 'Max', opt: 'max' },
    { label: 'Min', opt: 'min' },
    { label: 'Med', opt: 'med' },
    { label: 'First Quartile', opt: 'q1' },
    { label: 'Third Quartile', opt: 'q3' },
    { label: 'Weighted Sum', opt: 'sum' },

  ]

  constructor() { }

  ngOnInit(): void {
  }


  save(){
    
  }
}
