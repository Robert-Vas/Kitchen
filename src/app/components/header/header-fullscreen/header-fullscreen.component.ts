import {Component, OnInit} from '@angular/core';
import * as screenfull from 'screenfull';
import {Screenfull} from 'screenfull';

@Component({
  selector: 'app-header-fullscreen',
  templateUrl: './header-fullscreen.component.html',
  styleUrls: ['./header-fullscreen.component.scss']
})
export class HeaderFullscreenComponent implements OnInit {
  isFullscreen = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleScreen() {
    this.isFullscreen = !this.isFullscreen;
    const sf = screenfull as Screenfull;
    if (sf.isEnabled) {
      sf.toggle();
    }
  }
}
