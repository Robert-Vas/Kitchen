import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-header-icon',
  templateUrl: './header-icon.component.html',
  styleUrls: ['./header-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderIconComponent  {
  loading = true;

  constructor(private cdr: ChangeDetectorRef) {
  }

  change() {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 500);
  }
}
