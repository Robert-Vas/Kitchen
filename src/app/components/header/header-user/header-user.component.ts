import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, ModalService, UserModel} from '../../../shared';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {

  constructor(private router: Router,
              private modalService: ModalService,
              public authService: AuthService) {
  }

  logout() {

    this.modalService.confirm('Are you sure you want to exit?').afterClose.subscribe(r => {
      if (r) {
        this.authService.signOut().then(() => {
          this.authService.user = new UserModel();
          this.authService.isAuthenticated = false;
          this.router.navigateByUrl(this.authService.loginUrl);
        });
      }
    });
  }

}
