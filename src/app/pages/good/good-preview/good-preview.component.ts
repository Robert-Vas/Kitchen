import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-good-preview',
  templateUrl: './good-preview.component.html',
  styleUrls: ['./good-preview.component.scss']
})
export class GoodPreviewComponent implements OnInit {
  @Input() url: string;
  constructor() { }

  ngOnInit() {
  }

}
