import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dishes-preview',
  templateUrl: './dishes-preview.component.html',
  styleUrls: ['./dishes-preview.component.scss']
})
export class DishesPreviewComponent implements OnInit {
  @Input() url: string;
  constructor() { }

  ngOnInit() {
  }

}
